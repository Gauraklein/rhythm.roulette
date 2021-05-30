import * as React from "react"

import { Get } from 'react-axios'


const IndexPage = () => {
  // the guts of the randomization will be balancing these 2 values
  // they are expected to be in RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
  // may need dayjs or could do some Math.random shenanigans

  // TODO: Externalize api calls and randomizer

  let publishedAfter = "2020-12-01T00:00:00Z"

  let publishedBefore = "2021-01-01T00:00:00Z"

  const ytUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=vinyl&publishedAfter=" + publishedAfter + "&publishedBefore=" + publishedBefore + "&type=video&order=date&videoCategoryId=10&maxResults=3&videoEmbeddable=true&videoType=any&key=" + process.env.GATSBY_YT_KEY

  return (
    <main>
      <h1> Rhythm Roulette Virtual Edition</h1>

      <Get url={ytUrl}>
        {(error, response, isLoading, makeRequest, axios) => {
          if (error) {
            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
          }
          else if (isLoading) {
            return (<div>Loading...</div>)
          }
          else if (response !== null) {
            // Just mapping titles for now, need to look into iframes
            // as well as how best to randomly generate dates
            return (<div>{response.data.items.map((item) => {
              return (<h1> {item.snippet.title}</h1>)
            })} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </main>
  )
}

export default IndexPage
