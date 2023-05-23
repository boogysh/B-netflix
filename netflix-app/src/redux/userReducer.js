const initialState = {
  token: null,
  user: null,
  movies: [],
  // savedShows: [],
  savedShows: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "ALL_MOVIES":
      const findMovie = state.movies?.filter(
        (movie) => movie.id === action.payload.id
      );
      //console.log("findMovie:",findMovie[0])
      //console.log("findMovie-ID:",findMovie[0]?.id)

      const exist = findMovie[0]?.id === action.payload.id;
      console.log("exist",exist)
      if (exist) {
        return state;
      } else
        return {
          ...state,
          movies: [...state.movies, action.payload],
        };

    case "SHOWS":
      return {
        ...state,
        savedShows: action.payload,
      };

    //   case "POST":
    //     const updatedPosts = state.posts.map((post) => {
    //       if (post._id === action.payload.post._id) return action.payload.post;
    //       return post;
    //     });
    //     return {
    //       ...state,
    //       posts: updatedPosts,
    //     };

    default:
      return state;
  }
}
export default userReducer;
