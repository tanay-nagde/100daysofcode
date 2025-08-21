"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Challenge = {
  id: number;
  day: number;
  title: string;
  url: string;
  date: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  status: "Solved" | "Unsolved";
};

// Mock data for challenges
const challenges: Challenge[] = [
  {
    id: 1,
    day: 1,
    title: "Two Sum",
    url: "https://leetcode.com/problems/two-sum/",
    date: "2025-03-01",
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    status: "Solved",
  },
  {
    id: 2,
    day: 2,
    title: "Add Two Numbers",
    url: "https://leetcode.com/problems/add-two-numbers/",
    date: "2025-03-02",
    difficulty: "Medium",
    topics: ["Linked List", "Math", "Recursion"],
    status: "Unsolved",
  },
  {
    id: 3,
    day: 3,
    title: "Happy Number",
    url: "https://leetcode.com/problems/happy-number/",
    date: "2025-03-03",
    difficulty: "Easy",
    topics: ["Math", "Hash Table", "Two Pointers"],
    status: "Solved",
  },
];

export function SolvedProblem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDifficulty =
      difficultyFilter === "all" || challenge.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-900 text-green-300";
      case "Medium":
        return "bg-yellow-900 text-yellow-300";
      case "Hard":
        return "bg-red-900 text-red-300";
      default:
        return "bg-gray-800 text-gray-300";
    }
  };

  return (
    <section className="py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">solved Problems</h2>
        
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title or topic..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-48">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Difficulty" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-600 rounded-lg shadow-lg text-white">
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border border-gray-600 rounded-xl overflow-hidden font-semibold">
            <Table className="border border-gray-600 ">
              <TableHeader className= ""   >
                <TableRow className=" border border-gray-600 ">
                  <TableHead className="w-16 ">Day</TableHead>
                  <TableHead>Challenge</TableHead>
                  <TableHead className="w-24">Date</TableHead>
                  <TableHead className="w-24">Difficulty</TableHead>
                  <TableHead className="w-24 text-right">Link</TableHead>
                  <TableHead className="w-24 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {filteredChallenges.map((challenge) => (
                  <TableRow className="border border-gray-600 rounded-2xl" key={challenge.id}>
                    <TableCell className="font-medium">Day {challenge.day}</TableCell>
                    <TableCell>{challenge.title}</TableCell>
                    <TableCell>{new Date(challenge.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-center">
                      <Badge className= {getDifficultyColor(challenge.difficulty) }>{challenge.difficulty}</Badge>
                    </TableCell>
                    <TableCell className="flex items-center justify-end">
                      <a href={challenge.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </TableCell>
                    <TableCell className="text-right">{challenge.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
