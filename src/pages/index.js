import * as React from "react"
import VideoPlayer from "../components/video-player"

import { Get } from 'react-axios'
import ReactPlayer from 'react-player'
import randomDates from "../components/date-generator"

const IndexPage = () => {

  // TODO: Externalize api calls

  const rDates = randomDates()

  const ytUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=vinyl+LP&publishedAfter=" + rDates.publishedAfter + "&publishedBefore=" + rDates.publishedBefore + "&type=video&order=date&videoCategoryId=10&maxResults=3&videoEmbeddable=true&videoType=any&key=" + process.env.GATSBY_YT_KEY

 
  console.log(rDates)
  return (
    <main className="bg-black text-white h-screen p-4 md:p-8 overflow-y-auto">
      <h1 className="text-xl text-center m-4 font-bold"> Rhythm Roulette Virtual Edition</h1>

      <p className="text-lg text-center m-4"> This project is based on
      <br />
      <a className="text-blue-600" href="https://www.youtube.com/playlist?list=PL_QcLOtFJOUgNxURr8B4lNtf_3e9fWZzl">
       Rhythm Roulette by Mass Appeal.</a>
       <br />
      The basic steps are: 
      <br />
      1. Generate 3 random videos 
      <br />
      2. Make a beat by sampling.
      </p>

      <Get url={ytUrl}>
        {(error, response, isLoading, makeRequest) => {
          if (error) {
            return (<div>An unexpected error ocurred: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
          }
          else if (isLoading) {
            return (<div>Loading...</div>)
          }
          else if (response !== null) {

            return ( 
            <VideoPlayer videoData={response.data.items} />)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </main>
  )
}

export default IndexPage
