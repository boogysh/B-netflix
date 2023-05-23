import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    movies: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;