import React, { useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import { useDispatch, useSelector } from "react-redux";
import { SHOWS } from "../redux/actions";

export default function Home() {
  const { user, token, movies, savedShows } = useSelector(
    (state) => state.userReducer
  );
  console.log("allMovies:", movies?.length);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const getLikedMovies = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/${user._id}/favorites`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const likedMovies = await response.json();
      console.log("likedMovies", likedMovies);

      // const likedMovies = Object.keys(updatedSavedShows.savedShows); //not here 
      dispatch(SHOWS(likedMovies));
    };
    getLikedMovies();
  }, [dispatch, token, user._id]);

  const isLiked = Boolean(savedShows[movies.id]);
  useEffect(() => {}, [isLiked]);

  return (
    <>
      <Main />
      <Row rowId="1" title="Up comming" fetchURL={requests.requestUpcoming} />
      <Row rowId="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowId="3" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowId="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      {/* <Row rowId='5' title='Horror' fetchURL={requests.requestHorror} /> */}
    </>
  );
}
