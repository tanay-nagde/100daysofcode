import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/auth";
import { connectDB } from "./config/db";
import "./config/passport"; 
import { PORT } from "./utils/constants";
import { errorHandler } from "./middleware/ErrorHandler";
import { userRoutes } from "./routes/User.router";
import { challengeRouter } from "./routes/challenage.route";
dotenv.config({
    path: './.env'
  })

const app = express();
app.use(cors({ origin:  "http://localhost:3001", credentials: true }));
app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
connectDB();



app.use("/auth", authRoutes);
app.use("/api/user", userRoutes );
app.use("/api/challenge", challengeRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
