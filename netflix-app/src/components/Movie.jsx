import React, { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ALL_MOVIES, SHOWS } from "../redux/actions";

const Movie = ({ item, id }) => {
  const { token, savedShows, user } = useSelector((state) => state.userReducer);
  // console.log("savedShows:", savedShows);

  const dispatch = useDispatch();
  const isLiked = Boolean(savedShows[id]);
  //const likeCount = Object.keys(likes).length;
  // console.log("isLiked", isLiked);
  //-
  useEffect(() => {}, [isLiked]); 
  //-
  useEffect(() => {
    dispatch(ALL_MOVIES(item));
  }, [item, dispatch]);
  // PATCH LIKE
  const saveShow = async () => {
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
    // console.log("updatedSavedShows", updatedSavedShows);

    // const likedMovies = Object.keys(updatedSavedShows.savedShows); //not here
    dispatch(SHOWS(updatedSavedShows.savedShows));
  };
  //------------------------------------------
  


  return (
    <div className="w-[160px] md:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white">
        <p className="px-2 whitespace-pre-wrap text-xs md:text-sm font-bold flex flex-wrap  justify-center items-center h-full w-full text-center">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {isLiked ? (
            <FaHeart className="absolute top-4 left-4" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;

// import React, { useEffect, useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { ALL_MOVIES } from "../redux/actions";

// const Movie = ({ item }) => {
//   const { token, user, savedShows } = useSelector((state) => state.userReducer);
//   const [favorite, setFavorite] = useState("");

//   // console.log("savedShows:", savedShows);

//   const dispatch = useDispatch();
//   console.log("savedShows", savedShows);
//   const isLiked = favorite === "Added to favorites!";

//   // const isLiked = false;
//   // //-
//   useEffect(() => {}, [isLiked]);
//   //-
//   useEffect(() => {
//     dispatch(ALL_MOVIES(item));
//   }, [item, dispatch]);

//   // PATCH LIKE
//   const saveShow = async () => {
//     const response = await fetch(
//       `${process.env.REACT_APP_URL}/${user?._id}/movies`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ movieId: item.id }),
//       }
//     );
//     const resMsg = await response.json();
//     console.log("response:", resMsg.message);
//     setFavorite(resMsg.message);
//     // dispatch(SHOWS(updatedSavedShows));
//     // dispatch(SHOWS(updatedSavedShows.savedShows));
//   };

//   //------------------------------------------

//   return (
//     <div className="w-[160px] md:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-2">
//       <img
//         className="w-full h-auto block"
//         src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
//         alt={item?.title}
//       />
//       <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white">
//         <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
//           {item?.title}
//         </p>
//         <p onClick={saveShow}>
//           {isLiked ? (
//             <FaHeart className="absolute top-4 left-4" />
//           ) : (
//             <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Movie;
