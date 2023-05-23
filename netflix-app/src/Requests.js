const key = "c073a6f1aad43ea71af3b2d3f95c72c0"

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,

    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    // requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  };

  

  //https://developers.themoviedb.org/3/movies/get-movie-details

  // popular
  //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

  //search
  //https://developers.themoviedb.org/3/search/search-movies

  export default requests