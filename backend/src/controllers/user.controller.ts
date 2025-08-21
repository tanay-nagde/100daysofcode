import { get } from 'http';
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authmiddleware";
import { asyncHandler } from "../utils/asynchandler";
import { IUserDocument, UserModel } from "../models/User.model";
import ApiError from "../utils/ApiError";
import { UserRole } from '../models/User.model';

export const getuserbyid = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const{ id } = req.params;
    const user = await UserModel.findById(id).select("-refreshToken -__v");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
     res.status(200).json({ user });
  })

  export const getuserbyEmail = asyncHandler( async (req: Request, res: Response) => {
   
    const { email } = req.body;
    const user = await UserModel.findOne({ email }).select("-refreshToken -__v");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json({ user });
  })

 export const getMe = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        console.log("getMe called")
      const user = req.user 
      if (!user) {
        throw new ApiError(404, "User not found");
      }
      res.status(200).json( user );
    } 
  )

  export const getAllUsers = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const users = await UserModel.find({}).select("-refreshToken -__v");
      if (!users) {
        throw new ApiError(404, "Users not found");
      }
      res.status(200).json({ users });
    } );

    export const UpdateOrAddLeetcode = asyncHandler(
      async (req: AuthRequest, res: Response) => {  
        const { leetcode } = req.body;
        if (!leetcode) {
          throw new ApiError(400, "Leetcode username is required");
        }
        const user = req.user ; 
        if (!user) {
          throw new ApiError(404, "User not found");
        }
        const updatedUser = await UserModel.findByIdAndUpdate((user as IUserDocument)._id, { leetcode:  leetcode }, { new: true }).select("-refreshToken -__v");
        if (!updatedUser) {
          throw new ApiError(404, "User not found");
        }


        res.status(200).json({ updatedUser });
      }
    )

    export const makeAdmin = asyncHandler(
      async (req: AuthRequest, res: Response) => {
      
        const {email} = req.body;
        if (!email) {
          throw new ApiError(400, "Email is required");
        }
        const user = await UserModel.findOne({ email }).select("-refreshToken -__v");
        if (!user) {
          throw new ApiError(404, "User not found");
        }
        user.role = UserRole.ADMIN;
        await user.save();
        res.status(200).json({ message: "User role updated to admin" , user });
  })

  
  
