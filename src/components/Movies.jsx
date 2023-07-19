import React from "react";
import image from "../movieImage.webp";
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";
import { hover } from "@testing-library/user-event/dist/hover";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, favMovies } from "../redux/favoritesReducer";

function Movies() {
  const [movies, setMovies] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [hovered, setHovered] = useState("");
  let [favorites, setFavorites] = useState([]);
  //
  let data = useSelector(favMovies)
  const dispatch = useDispatch();
  console.log(data);

  /* API Call */
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/week?api_key=565dda78aae2b75fafddbc4320a33b38&page=" +
          pageNum
      )
      .then((res) => {
        // console.log(res.data.results);
        setMovies(res.data.results);
        // console.log(movies);
      });
  }, [pageNum]);

  /* Pagination */
  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  /* Show and Hide Emoji's */
  const onNext = () => {
    setPageNum(pageNum + 1);
  };

  const showEmoji = (id) => {
    setHovered(id);
  };

  const hideEmoji = (id) => {
    setHovered("");
  };

  /* Show and Hide Emoji's */
  const addEmoji = (id) => {
    console.log(id);
    const newFav = [...favorites];
    newFav.push(id);
    setFavorites(newFav);
  };
  //
  useEffect(() => {
    // console.log(favorites);
  }, [favorites]);
  //
  const removeEmoji = (id) => {
    const filteredFav = favorites.filter((elem) => {
      return elem != id;
    });
    setFavorites(filteredFav);
    console.log("removed", favorites);
  };

  return (
    <div className="p-10">
      <h1 className="mb-10 text-center font-bold text-xl">Trending Movies</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {movies.length == 0 ? (
          <Oval
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        ) : (
          movies.map((movie) => {
            return (
              <div
                name="movie card"
                onMouseOver={() => showEmoji(movie.id)}
                onMouseLeave={() => hideEmoji(movie.id)}
                key={movie.id}
                className="w-[160px]"
              >
                <div
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path})`,
                  }}
                  className="bg-cover border-2 w-[160px]  h-[240px] rounded-xl hover:scale-110 duration-300 "
                >
                  <div
                    className="px-6 py-2 text-xl bg-gray-900 w-[24px] flex justify-center opacity-75 ml-auto m-4 rounded-xl"
                    style={{ display: hovered == movie.id ? "flex" : "none" }}
                  >
                    {favorites.includes(movie.id) == false ? (
                      <div
                        onClick={() => {
                          addEmoji(movie.id);
                          dispatch(addFavorites(movie));
                        }}
                      >
                        ❤️
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          removeEmoji(movie.id);
                        }}
                      >
                        ❌
                      </div>
                    )}
                  </div>
                </div>
                <h4 className="mt-2 font-medium">
                  {movie.title || movie.name}
                </h4>
              </div>
            );
          })
        )}
      </div>
      <Pagination pageNum={pageNum} onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

export default Movies;
