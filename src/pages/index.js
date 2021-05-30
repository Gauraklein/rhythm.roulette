import * as React from "react"

import { Get } from 'react-axios'
import ReactPlayer from 'react-player'
import randomDates from "../components/date-generator"

const IndexPage = () => {

  // TODO: Externalize api calls and randomizer

  const rDates = randomDates()

  const ytUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=vinyl&publishedAfter=" + rDates.publishedAfter + "&publishedBefore=" + rDates.publishedBefore + "&type=video&order=date&videoCategoryId=10&maxResults=3&videoEmbeddable=true&videoType=any&key=" + process.env.GATSBY_YT_KEY

  const basePlayerUrl = "https://www.youtube.com/watch?v="

  let event = new Date

  console.log(rDates)
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

            console.log(response.data.items)
            // Just mapping titles for now, need to look into iframes
            // as well as how best to randomly generate dates
            return (<div>{response.data.items.map((item) => {
              return (<>
              <ReactPlayer url= {basePlayerUrl + item.id.videoId} />
              <h1 key={item.snippet.title}> {item.snippet.title}</h1>
              </> )
            })} <button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</button></div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </main>
  )
}

export default IndexPage
