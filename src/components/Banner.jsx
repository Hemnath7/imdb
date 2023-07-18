import React, { useEffect, useState } from "react";
import image from "../banner.jpg";
import "../App.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function Banner() {
  const [movieBanner, setMovieBanner] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/week?api_key=565dda78aae2b75fafddbc4320a33b38"
      )
      .then((res) => {
        // console.log(res.data.results);
        setMovieBanner(res.data.results[0]);
        console.log(movieBanner);
      });
  }, []);

  return (
    <>
      {movieBanner == "" ? (
        <Oval
          height="80"
          width="80"
          radius="9"
          color="green"
          secondaryColor="gray"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        ></Oval>
      ) : (
        <div
          className="banner-container h-[60vh] bg-cover bg-left-top"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/original/${movieBanner.poster_path})`,
          }}
        >
          <div className="banner font-bold text-xl text-white">
            {movieBanner.title}
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
