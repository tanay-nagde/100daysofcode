import mongoose, { Schema, Document, model, Types } from "mongoose";

// Define the Difficulty Enum
export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

// Define the Interface for TypeScript
interface IChallenge {

  title: string;
  titleslug: string;
  tags: string[];
  difficulty: Difficulty;
  day: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IChallengeDocuent extends IChallenge, Document {}

type IChallengeModel = mongoose.Model<IChallengeDocuent>;
// Define the Mongoose Schema
const ChallengeSchema = new Schema<IChallengeDocuent>(
  {
    
    title: { type: String, required: true },
    titleslug: { type: String, required: true, unique: true },
    tags: { type: [String], default: [] },
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    day: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    
  }
);

// Create and export the Mongoose Model
export const ChallengeModel:IChallengeModel = model<IChallengeDocuent>("Challenge", ChallengeSchema);
