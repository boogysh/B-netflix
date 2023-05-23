import User from "../models/User.js";
import axios from "axios";

/* UPDATE - savedShows */
//
// export const saveMovie = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { movieId } = req.body;
//     console.log("movieId:", movieId);

//     const user = await User.findById(id);
//     const isLiked = user.savedShows.includes(movieId);
//     console.log("isLiked:", isLiked);

//     if (isLiked) {
//       await User.findByIdAndUpdate(id, {
//         $pull: { savedShows: movieId },
//       });
//       res.status(200).json({ message: "Removed from favorites!" });
//     }
//     //--
//     else {
//       await User.findByIdAndUpdate(id, {
//         $push: { savedShows: movieId },
//       });
//       res.status(200).json({ message: "Added to favorites!" });
//     }

//     //----
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

//--------------------

export const saveMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId } = req.body;
    console.log("movieId:", movieId);
    const strMovieId = movieId.toString();

    const user = await User.findById(id);
    console.log("user:", user);

    const isLiked = user.savedShows.get(strMovieId);
    console.log("isLiked:", isLiked);

    if (isLiked) {
      user.savedShows.delete(strMovieId);
    } else {
      user.savedShows.set(strMovieId, true);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { savedShows: user.savedShows },
      { new: true }
    );
    console.log("user.savedShows", user.savedShows);
    console.log("updatedUser", updatedUser);

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const searchMovie = async (req, res) => {
  try {
    // const { searchValue } = req.body;
    const {searchId } = req.params;
    // https://www.googleapis.com/youtube/v3/search?key=apiKey&type=video&part=snippet&q=foo
    const baseUrl = "https://www.googleapis.com/youtube/v3";
    const url = `${baseUrl}/search?key=${process.env.API_KEY}&type=video&part=snippet&q=${searchId}`;
    const response = await axios.get(url);
    console.log(response.data.items[0].id.videoId);
    // res.status(200).json(response.data.items);
    res.status(200).json(response.data.items[0].id.videoId);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
