import express from "express";

import { saveMovie, searchMovie } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET
router.get("/search/:searchId", verifyToken, searchMovie);

/* UPDATE  */
// router.patch("/:id/movies/:movieId", verifyToken, saveMovie);
router.patch("/:id/movies", verifyToken, saveMovie);

export default router;
