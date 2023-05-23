import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import { ALL_MOVIES } from "../redux/actions";

const Row = ({ title, fetchURL, rowId }) => {
  const [movies, setMovies] = useState([]);

  // const dispatch = useDispatch();

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
      // dispatch(ALL_MOVIES(response.data.results))
    });
  }, [fetchURL]);
  //
  // SHOW ALL MOVIES
  // console.log(movies);

  

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} id={item.id} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-2 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
