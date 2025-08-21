
export enum UserRole {
    ADMIN = "admin",
    PARTICIPANT = "participant",
  }
  enum ProblemDifficulty {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
  }
export interface User {
  _id: string;
  displayName: string;
  name?: { firstname?: string; lastname?: string };
  oauthProvider: string;
  leetcode?: string;
  github?: string;
  oauthId: string;
  avatar: string;
  email: string;
  role: UserRole;
  }
  
  export interface Problem {
    id: string;
    title: string;
    titleSlug: string;
    url: string;
    day:number;
    date: Date;
    tags: string[];
    difficulty: ProblemDifficulty;
  }
  
export interface ChallengeResponse {
  total: number
  page: number
  totalPages: number
  challenges: Problem[]
}
export interface ChallengeResponseWithoutPagination{
 
  challenges: Problem[]
}

