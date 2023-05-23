import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { SHOWS } from "../redux/actions";
import Video from "./Video";
// import { useParams } from "react-router-dom";

const SavedShows = () => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  console.log("title:+", title);

  const { savedShows, movies, user, token } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  console.log("savedShows", savedShows);
  // const isLiked = Boolean(savedShows[id]);
  const savedShows_Str = Object.keys(savedShows);
  console.log("savedShows_Str", savedShows_Str);
  //-----
  console.log(movies.length);
  console.log(movies);
  console.log(movies[0].id.toString());

  const filteredMovies = movies.filter((x) =>
    savedShows_Str.includes(x.id.toString())
  );
  console.log("filteredMovies", filteredMovies);

  useEffect(() => {}, [filteredMovies]);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // PATCH LIKE
  const deleteShow = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/${user._id}/movies`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: id }),
      }
    );
    const updatedSavedShows = await response.json();
    console.log("updatedSavedShows-savedShows", updatedSavedShows.savedShows);

    // const likedMovies = Object.keys(updatedSavedShows.savedShows); //not here
    dispatch(SHOWS(updatedSavedShows.savedShows));
  };

  // const { searchId = "The Super Mario Bros. Movie"} = useParams()
  // const { searchId } = useParams()

  const searchMovie = async (searchId) => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/search/${searchId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const responseVideoId = await response.json();
    console.log("responseVideoId", responseVideoId);
    setVideoId(responseVideoId);
    setShow(!show);
    setTitle(searchId);
  };

  return (
    <>
      <h2 className="text-white font-bold   md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {filteredMovies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] md:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                // src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white flex justify-center">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <button
                  className="absolute z-99 bottom-14 text-xs md:text-sm font-bold flex  py-1 px-5 border-[1px] rounded-full border-gray-500 hover:bg-gray-50/5"
                  // onClick={(() => searchMovie()) || (() => setShow(!show))}
                  onClick={() => searchMovie(item?.original_title)}
                >
                  Trailer
                </button>

                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
      {/* VIDEO */}
      {show && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-20 w-full h-full bg-gray-800/50 flex justify-center items-center">
          <div>
            <div className="flex flex-col w-full">
              <button
                onClick={() => setShow(!show)}
                className="flex justify-center items-center  ml-auto relative  right-2 md:left-8 bottom-2 p-[6px] bg-gray-200  rounded-full z-1000"
              >
                <AiOutlineClose />
              </button>
            </div>
            {/* <div className="w-[800px] h-[500px]"> */}
            <div className="p-2 w-[280px] h-[200px] xxs:w-[340px] xxs:h-[220px] xs:w-[480px] xs:h-[300px] md:w-[700px] md:h-[420px] lg:w-[900px] lg:h-[600px]">
              <Video videoId={videoId} title={title} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedShows;
