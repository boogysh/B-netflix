import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

/* ROUTES */
app.use("/", authRoutes);
app.use("/", usersRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 4444;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server is running on port ${PORT}`);
});
