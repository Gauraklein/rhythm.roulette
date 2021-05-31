import * as React from "react";
import ReactPlayer from "react-player";

const basePlayerUrl = "https://www.youtube.com/watch?v=";

// TODO: Make ReactPlayer responsive
const VideoPlayer = (props) => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      {props.videoData.map((video) => {
        return (
          <div className="p-4 flex flex-col justify-center items-center player-wrapper">
            <ReactPlayer
              width="400px"
              height="250px"
              url={basePlayerUrl + video.id.videoId}
              controls={true}
              className="react-player"
            />
            <h1 key={video.snippet.title}> {video.snippet.title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default VideoPlayer;
