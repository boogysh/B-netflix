import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 8, unique: true },
    // savedShows: { type: Array, default: [] },
    savedShows: { type: Map, of: Boolean },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
