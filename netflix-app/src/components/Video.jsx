import React from "react";

const Video = ({ videoId, title }) => {
  return (
    <>
      <iframe
        style={{width: '100%', height: '100%'}}
        width="100%"
        height="100%"
        // src="https://www.youtube.com/embed/TnGl01FkMMo"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default Video;
