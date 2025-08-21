import express from "express";

import { getAllUsers, getMe, getuserbyEmail, getuserbyid, makeAdmin, UpdateOrAddLeetcode} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/authmiddleware";

export const userRoutes = express.Router();

userRoutes.get("/me", isAuthenticated , getMe); 
userRoutes.get("/all", getAllUsers);
userRoutes.post("/MakeAdmin", makeAdmin);
userRoutes.post("/email", getuserbyEmail);
userRoutes.post("/updateleetcode", isAuthenticated , UpdateOrAddLeetcode);
userRoutes.get("/:id", getuserbyid);    