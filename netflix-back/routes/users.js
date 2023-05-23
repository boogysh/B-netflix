import express from "express";

import { getFavorites, saveMovie, searchMovie } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET
router.get("/:id/favorites", verifyToken, getFavorites);
router.get("/search/:searchId", verifyToken, searchMovie);

/* UPDATE  */
router.patch("/:id/movies", verifyToken, saveMovie);

export default router;
