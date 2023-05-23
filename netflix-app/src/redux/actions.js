export const LOGIN = (payload) => {
    return {
      type: "LOGIN",
      payload: payload,
    };
  };
  export const LOGOUT = (payload) => {
    return {
      type: "LOGOUT",
      payload: payload,
    };
  };

  export const ALL_MOVIES = (payload) => {
    return {
      type: "ALL_MOVIES",
      payload: payload,
    };
  };

  export const SHOWS = (payload) => {
    return {
      type: "SHOWS",
      payload: payload,
    };
  };