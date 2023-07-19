import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { addFavorites, favMovies } from "../redux/favoritesReducer";
import { useSelector } from "react-redux";
import axios from "axios";

let genreIds = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
let sampleMovies = [
  {
    adult: false,
    backdrop_path: "/ogFIG0fNXEYRQKrpnoRJcXQNX9n.jpg",
    id: 619930,
    title: "Narvik",
    original_language: "no",
    original_title: "Kampen om Narvik",
    overview:
      "April, 1940. The eyes of the world are on Narvik, a small town in northern Norway, a source of the iron ore needed for Hitler's war machine. Through two months of fierce winter warfare, the German leader is dealt with his first defeat.",
    poster_path: "/gU4mmINWUF294Wzi8mqRvi6peMe.jpg",
    media_type: "movie",
    genre_ids: [10752, 18, 36, 28],
    popularity: 321.063,
    release_date: "2022-12-25",
    video: true,
    vote_average: 7.406,
    vote_count: 53,
  },
  {
    adult: false,
    backdrop_path: "/6RCf9jzKxyjblYV4CseayK6bcJo.jpg",
    id: 804095,
    title: "The Fabelmans",
    original_language: "en",
    original_title: "The Fabelmans",
    overview:
      "Growing up in post-World War II era Arizona, young Sammy Fabelman aspires to become a filmmaker as he reaches adolescence, but soon discovers a shattering family secret and explores how the power of films can help him see the truth.",
    poster_path: "/d2IywyOPS78vEnJvwVqkVRTiNC1.jpg",
    media_type: "movie",
    genre_ids: [18],
    popularity: 163.3,
    release_date: "2022-11-11",
    video: false,
    vote_average: 8.02,
    vote_count: 561,
  },
  {
    adult: false,
    backdrop_path: "/fTLMsF3IVLMcpNqIqJRweGvVwtX.jpg",
    id: 1035806,
    title: "Detective Knight: Independence",
    original_language: "en",
    original_title: "Detective Knight: Independence",
    overview:
      "Detective James Knight 's last-minute assignment to the Independence Day shift turns into a race to stop an unbalanced ambulance EMT from imperiling the city's festivities. The misguided vigilante, playing cop with a stolen gun and uniform, has a bank vault full of reasons to put on his own fireworks show... one that will strike dangerously close to Knight's home.",
    poster_path: "/jrPKVQGjc3YZXm07OYMriIB47HM.jpg",
    media_type: "movie",
    genre_ids: [28, 53, 80],
    popularity: 119.407,
    release_date: "2023-01-20",
    video: false,
    vote_average: 6.6,
    vote_count: 10,
  },
  {
    adult: false,
    backdrop_path: "/e782pDRAlu4BG0ahd777n8zfPzZ.jpg",
    id: 555604,
    title: "Guillermo del Toro's Pinocchio",
    original_language: "en",
    original_title: "Guillermo del Toro's Pinocchio",
    overview:
      "During the rise of fascism in Mussolini's Italy, a wooden boy brought magically to life struggles to live up to his father's expectations.",
    poster_path: "/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg",
    media_type: "movie",
    genre_ids: [16, 14, 18],
    popularity: 754.642,
    release_date: "2022-11-18",
    video: false,
    vote_average: 8.354,
    vote_count: 1694,
  },
];

function Favorites() {
  const favMoviesClicked = useSelector(favMovies);
  let [genres, setGenres] = useState([]);
  // let [movies, setMovies] = useState(sampleMovies);
  let [movies, setMovies] = useState(favMoviesClicked);
  let [searchItem, setSearchItem] = useState("");
  let [currGenre, setCurrGenre] = useState("All Genres");
  let [curRatingOrder, setCurRatingOrder] = useState(0);
  let [curPopularityOrder, setCurPopularityOrder] = useState(0);
  let [noOfElements, setNoOfElements] = useState(2);
  let [curPage, setCurPage] = useState(1);
  //

  // New feature - filtering using movies ID
  // const favMoviesId = useSelector(favMovies);
  // let filteredFavMovies = movies.filter((movie)=>{
  //   return movie.id == favMovies? console.log(filteredFavMovies): console.log('saas')

  // })

  // API Call
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/week?api_key=565dda78aae2b75fafddbc4320a33b38&page=1"
      )
      .then((res) => {
        // console.log(res.data.results);
        // setMovies(res.data.results);
        // console.log(movies);
      });
  }, []);

  // Delete function
  const deleteMovie = (id) => {
    // can't change movies array directly. --in react
    const restOfTheMovies = movies.filter((movie) => {
      return movie.id != id;
    });
    setMovies(restOfTheMovies);
  };

  // filtering genres from the movies list, and used when switching tabs
  useEffect(() => {
    let temp = movies.map((movie) => genreIds[movie.genre_ids[0]]);
    // console.log(temp)
    temp = new Set(temp);
    // console.log(temp);
    setGenres(["All Genres", ...temp]);
  }, []);

  // Filter - event handler
  let onCurrGenre = (genre) => {
    setCurrGenre(genre);
    setCurPage(1);
  };

  // Search - feauture
  let searchedMovies =
    searchItem == ""
      ? movies
      : movies.filter((movie) => {
          let movieName = movie.title || movie.name;
          let lowerCharSearch = searchItem.toLowerCase();
          return movieName.toLowerCase().includes(lowerCharSearch);
        });

  // Filter
  let filteredMovies =
    currGenre == "All Genres"
      ? searchedMovies
      : searchedMovies.filter((searchedMovie) => {
          return genreIds[searchedMovie.genre_ids[0]] == currGenre;
        });

  // Sorting : Rating
  if (curRatingOrder != 0) {
    if (curRatingOrder == 1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        // console.log(movieA, movieB);
        return movieA.vote_average - movieB.vote_average;
      });
    } else if (curRatingOrder == -1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieB.vote_average - movieA.vote_average;
      });
    }
  }

  // Sorting : Popularity
  if (curPopularityOrder != 0) {
    if (curPopularityOrder == 1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieA.popularity - movieB.popularity;
      });
    } else if (curPopularityOrder == -1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieB.popularity - movieA.popularity;
      });
    }
  }

  // Pagination : no Of Elements : step-1
  let si = noOfElements * (Number(curPage) - 1);
  let ei = Number(noOfElements) + Number(si);
  // console.log(si, ei)
  let maxPageNum = Math.ceil(filteredMovies.length / noOfElements);
  filteredMovies = filteredMovies.slice(si, ei);

  // Pagination : dynamic page change
  console.log(maxPageNum);

  const onPrev = (pageNum) => {
    if (pageNum > 0) {
      setCurPage(pageNum);
    }
  };

  const onNext = (pageNum) => {
    if (pageNum <= maxPageNum) {
      setCurPage(pageNum);
      console.log("clicked");
    }
  };

  // UI
  return (
    <div>
      {/* Tabs */}
      <div className="pt-8 pb-4 flex justify-center gap-4 ">
        {genres.map((genre) => {
          return (
            <button
              className={
                genre == currGenre
                  ? `bg-blue-400 py-2 px-4 rounded-lg font-bold text-white`
                  : "bg-gray-400 py-2 px-4 rounded-lg font-bold text-white hover:bg-blue-400"
              }
              onClick={() => onCurrGenre(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>
      {/* Search */}
      <div className="pb-8 flex justify-center gap-4 border-b">
        <input
          className="border-2 px-2 py-1 text-center"
          type="text"
          placeholder="Search"
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
        {console.log(searchItem)}
        <input
          onChange={(e) => setNoOfElements(e.target.value)}
          type="number"
          value={noOfElements}
          className="border-2 px-2 py-1 text-center"
        />
      </div>
      {/* Table  */}
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-10">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      setCurRatingOrder(1);
                      setCurPage(1);
                    }}
                    className="p-1 border rounded-full w-[24px] h-[24px] text-center"
                  >
                    ^
                  </div>
                  Rating
                  <div
                    onClick={() => {
                      setCurRatingOrder(-1);
                      setCurPage(1);
                    }}
                    className="p-1 border rounded-full w-[24px] h-[24px] text-center rotate-180"
                  >
                    ^
                  </div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                <div className="flex gap-2">
                  <div
                    onClick={() => {
                      setCurPopularityOrder(1);
                      setCurPage(1);
                    }}
                    className="p-1 border rounded-full w-[24px] h-[24px] text-center"
                  >
                    ^
                  </div>
                  Popularity
                  <div
                    onClick={() => {
                      setCurPopularityOrder(-1);
                      setCurPage(1);
                    }}
                    className="p-1 border rounded-full w-[24px] h-[24px] text-center rotate-180"
                  >
                    ^
                  </div>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Genre
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {filteredMovies.map((movie) => {
              return (
                <tr class="hover:bg-gray-50" key={movie.id}>
                  <th class="flex gap-3 items-center px-6 py-4 font-normal text-gray-900">
                    <img
                      className="w-[160px] h-[120px] object-cover object-center"
                      src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`}
                      alt=""
                    />

                    <div class="text-sm">
                      <div class="font-medium text-gray-700">{movie.title}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4 text-center">{movie.vote_average}</td>
                  <td class="px-6 py-4 text-center">{movie.popularity}</td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        {genreIds[movie.genre_ids[0]]}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div
                      onClick={() => deleteMovie(movie.id)}
                      className="flex justify-end gap-4 text-red-600 cursor-pointer"
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Table */}
      <Pagination pageNum={curPage} onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

export default Favorites;
