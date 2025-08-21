import { Router } from "express";

import { isAuthenticated } from "../middleware/authmiddleware";
import {addchallenge, deleteChallange, getAllChallange, getChallangeWithLimit} from "../controllers/Challenge.controller";

export const challengeRouter = Router();
challengeRouter.post("/addproblem", addchallenge);
challengeRouter.post("/deleteproblem", deleteChallange);
challengeRouter.get("/getproblem", isAuthenticated, getChallangeWithLimit);
challengeRouter.get("/getallproblem", getAllChallange);