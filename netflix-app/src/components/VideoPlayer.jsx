import React, { useState, useRef } from "react";
import { debounce } from "lodash";

const Video = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const urlMario = "https://www.youtube.com/embed/RjNcTBXTk4I";
  const handleVideoPress = debounce(() => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }, 500);

  return (
    <div className="video__player w-full h-auto rounded-[10px] overflow-hidden ">
      <video
        // className="video__player"
        className="w-[600px]"
        onClick={handleVideoPress}
        loop
        ref={videoRef}
        src={urlMario}
        controls
      ></video>
    </div>
  );
};

export default Video;
