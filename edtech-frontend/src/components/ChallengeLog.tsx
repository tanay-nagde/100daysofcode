import { useState, useMemo } from "react";
import { useAppSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Filter } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function ChallengeLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const problems = useAppSelector((state: RootState) => state.problems.problems);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficultyFilter, problems]);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Daily Challenge Log</h2>
          <p className="max-w-2xl mx-auto">
            Track all the challenges completed so far in the 100 Days of Code journey
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by title..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border border-gray-600 rounded-lg overflow-hidden font-semibold">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Day</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-24">Date</TableHead>
                <TableHead className="w-24">Difficulty</TableHead>
                <TableHead className="w-24 text-right">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <TableRow key={problem._id}>
                    <TableCell>{problem.day}</TableCell>
                    <TableCell>{problem.title}</TableCell>
                    <TableCell>{new Date(problem.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <a
                        href={`https://leetcode.com/problems/${problem.titleslug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No challenges found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
