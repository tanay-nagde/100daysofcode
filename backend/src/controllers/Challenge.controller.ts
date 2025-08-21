
import { Response } from "express";
import { asyncHandler } from "../utils/asynchandler";
import { AuthRequest } from "./authController";
import ApiError from "../utils/ApiError";
import { ChallengeModel } from "../models/challenge.model";

const fetchproblem = async (url:string)=>{
   
     
    const titleSlug= url.split("problems/")[1].toString()
    console.log(titleSlug);
    
          const response = await fetch("https://leetcode.com/graphql", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Referer": "https://leetcode.com",
                  "Origin": "https://leetcode.com",
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
              },
              body: JSON.stringify({
                  query: `query getProblemDetails($titleSlug: String!) {
                      question(titleSlug: $titleSlug) {
                          title
                          titleSlug
                          questionFrontendId
                          difficulty
                          topicTags {
                              name
                              slug
                          }
                          stats
                      }
                  }`,
                  variables: { titleSlug }
              })
          });
    
          const data = await response.json();
    
          if (!data.data || !data.data.question) {
             throw new ApiError(404, "Problem not found");
          }
    
          const question = data.data.question;
    
          const problemDetails = {
              id: question.questionFrontendId,
              title: question.title,
              titleSlug: question.titleSlug,
              url: `https://leetcode.com/problems/${question.titleSlug}`,
              difficulty: question.difficulty,
              likes: question.likes,
              dislikes: question.dislikes,
              isPaidOnly: question.isPaidOnly,
              topicTags: question.topicTags.map((tag: {name:string , slug:string})  => tag.name),
              stats: JSON.parse(question.stats) // Converts JSON string into an object
          };
          console.log(problemDetails);

          return problemDetails;
    

}

export const addchallenge = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const {url , day , date} = req.body
        if (!url) {
            throw new ApiError(400, "URL is required");
        }
        const challenge = await fetchproblem(url)
        if (!challenge) {
            throw new ApiError(404, "Problem not found");
        }
        const {title, titleSlug, difficulty, topicTags} = challenge

        const createdProblem = await ChallengeModel.create({
            title,
           titleslug: titleSlug ,
            difficulty,
            tags: topicTags,
            day,
            date
        });
      
        res.status(200).json({ message: "Problems fetched successfully" , data: createdProblem });
    }
  )

  export const addMultipleChallenges = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const { problems } = req.body;
  
      if (!Array.isArray(problems) || problems.length === 0) {
        throw new ApiError(400, "Problems array is required and cannot be empty");
      }
  
      const results = [];
      const errors = [];
  
      for (const item of problems) {
        const { url, day, date } = item;
  
        if (!url) {
          errors.push({ url, error: "URL is required" });
          continue;
        }
  
        try {
          const challenge = await fetchproblem(url);
  
          if (!challenge) {
            errors.push({ url, error: "Problem not found" });
            continue;
          }
  
          const { title, titleSlug, difficulty, topicTags } = challenge;
  
          const createdProblem = await ChallengeModel.create({
            title,
            titleslug: titleSlug,
            difficulty,
            tags: topicTags,
            day,
            date
          });
  
          results.push(createdProblem);
        } catch (err: unknown) {
            if (err instanceof Error) {
              errors.push({ url, error: err.message });
            } else {
              errors.push({ url, error: "An unknown error occurred" });
            }
          }
      }
  
      res.status(200).json({
        message: "Processed multiple problems",
        successCount: results.length,
        failureCount: errors.length,
        data: results,
        errors
      });
    }
  );
  

  export const getChallangeWithLimit = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        console.log("getChallange called 2")
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const totalChallenges = await ChallengeModel.countDocuments();
      const challenges = await ChallengeModel.find({})
        .select("-__v")
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit);

        
  
      if (!challenges || challenges.length === 0) {
        throw new ApiError(404, "Challenges not found");
      }
  
      res.status(200).json({
        total: totalChallenges,
        page,
        totalPages: Math.ceil(totalChallenges / limit),
        challenges,
      });
    }
  );

  export const getAllChallange = asyncHandler(
    async (req: AuthRequest, res: Response) => {
       
      const challenges = await ChallengeModel.find({})
        .select("-__v")
        .sort({ date: 1 });
  
      if (!challenges || challenges.length === 0) {
        throw new ApiError(404, "Challenges not found");
      }
  
      res.status(200).json({
        challenges,
      });
    }
    );
  

    export const deleteChallange = asyncHandler(
        async (req: AuthRequest, res: Response) => {
            console.log(req.body);
            const {titleslug} = req.body;
            if (!titleslug) {
                throw new ApiError(400, "titleslug is required");
            }
            const challenge = await ChallengeModel.findOneAndDelete({titleslug});
            if (!challenge) {
                throw new ApiError(404, "Challenge not found");
            }
            res.status(200).json({ message: "Challenge deleted successfully" , data: [] });
        }
    )