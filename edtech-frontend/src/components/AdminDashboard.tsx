"use client";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Users, ListTodo, UploadCloud, Trophy } from "lucide-react";
import { useGetChallengesQuery } from "@/feature/slice/problemslice";

const stats = [
  { label: "Users", value: 1200, icon: <Users className="w-4 h-4 text-blue-500" /> },
  { label: "Problems", value: 350, icon: <ListTodo className="w-4 h-4 text-green-500" /> },
  { label: "day", value: 78, icon: <UploadCloud className="w-4 h-4 text-yellow-500" /> },
  { label: "Contests", value: 14, icon: <Trophy className="w-4 h-4 text-pink-500" /> },
];

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [page, setPage] = useState(1);
  const { data } = useGetChallengesQuery({ page, limit: 10 });
  const [totalPages, setTotalPages] = useState(1);
const [problemResponse, setProblemResponse] = useState("");
const [problemResponseError, setProblemResponseError] = useState("");
  const [search, setSearch] = useState("");
  const [dialogProblem, setDialogProblem] = useState<any | null>(null);
  const [problems, setProblems] = useState([
    {
      title: "Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      date: "2025-04-07",
      day: "Day 1",
      difficulty: "Easy",
      tags: "Array, Hash Table",
    },
    {
      title: "Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      date: "2025-04-08",
      day: "Day 2",
      difficulty: "Medium",
      tags: "Hash Table, String, Sliding Window",
    },
    {
      title: "Merge k Sorted Lists",
      url: "https://leetcode.com/problems/merge-k-sorted-lists/",
      date: "2025-04-09",
      day: "Day 3",
      difficulty: "Hard",
      tags: "Linked List, Divide and Conquer, Heap",
    },
  ]);

  const [form, setForm] = useState({
    url: "",
    day: null as number | null,
  });

  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    if (data && data.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const generateFormattedMessage = (p: any) => {
    return `🚀 100 Days of Code - Problem of the Day [${p.day}] 🚀\n\n💡 Today's Challenge: ${p.title}\n🔗 ${p.url}\n\n📌 Difficulty: ${p.difficulty.toLowerCase()}\n📂 Topic: ${p.tags}\n🧠 Think. Solve. Discuss.\n💬 Got doubts? Share your approach! → https://shorturl.at/ajlcs\n📜 Track all problems & progress → https://shorturl.at/YzJKR\n\nApproach Guide: https://admitted-search-a50.notion.site/100-Days-Of-Code-Approach-Intuition-1aee557f627380df9b6fe7fbfed07ffe\n\n⚡ Let’s code, learn, and conquer! 💪🔥 #100DaysOfCode #abhyudayacodingclub`;
  };

  const handleAddProblem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.url || !form.day || !date) return;



    const newProblem = {
      url: form.url,
      date: date || new Date(),
      day: form.day
    };
console.log(newProblem);
    axios
      .post("http://localhost:3000/api/challenge/addproblem", newProblem)
      .then((res) => {
        console.log("Success:", res);
        setProblemResponse(res.data.message);
      
        setForm({ url: "", day: 0, });
      })
      .catch((error) => {
        console.error("Error:", error);
        setProblemResponseError(error.response.data.message);
        
      });

    
  };

  const handleMakeAdmin = async () => {
    if (!adminEmail) return;
    try {
      const res = await axios.post("http://localhost:3000/api/user/makeadmin", {
        email: adminEmail,
      });
      console.log("Admin made successfully", res.data);
      setAdminEmail("");
    } catch (error) {
      console.error("Failed to make admin:", error);
    }
  };
  const handleremoveAdmin = async () => {
    if (!adminEmail) return;
    try {
      const res = await axios.post("http://localhost:3000/api/user/removeadmin", {
        email: adminEmail,
      });
      console.log("Admin removed successfully", res.data);
      setAdminEmail("");
    } catch (error) {
      console.error("Failed to remove admin:", error);
    }
  };
  const handleDelete = (index: number) => {
    const filtered = problems.filter((_, i) => i !== index);
    setProblems(filtered);
  };

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const s = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(s) ||
        p.day.toLowerCase().includes(s) ||
        p.difficulty.toLowerCase().includes(s) ||
        p.tags.toLowerCase().includes(s)
      );
    });
  }, [search, problems]);

  return (
    <main className="min-h-screen bg-black text-white py-10 px-4 md:px-10">
      <div className="flex flex-wrap my-10 items-center justify-center gap-4 w-full">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="border rounded-xl w-60 p-3 flex items-center gap-3 bg-gray-900 border-emerald-600 bg-card text-card-foreground"
          >
            <div className="p-2 bg-muted rounded-md border border-emerald-300">
              {stat.icon}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-semibold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">➕ Admin Dashboard</h2>

          {/* TWO SECTION FLEX  */}
          <div className="flex justify-evenly flex-wrap">
            {/* Left - Add Problem */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">➕ Add Problem</h3>
              <Label>Problem URL</Label>
              <Input
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://leetcode.com/problems/example"
              />
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-full"
                modifiersClassNames={{
                  selected: "bg-emerald-500 text-white",
                }}
              />
              <Label>Day</Label>
              <Input
  type="number" // 👈 ensures only numbers are entered
  value={form.day ?? ""} // 
  onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
  placeholder="1"
/>
              <Button onClick={handleAddProblem} className="bg-emerald-600 hover:bg-emerald-500">
                Add Problem
              </Button>
            </div>

            <h3 className="text-emerald-600">{problemResponse}</h3>
            <h3 className="text-red-600">{problemResponseError}</h3>


            {/* Right - Add /Remove Admin */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">🛡️ Make Admin</h3>
              <Label>Email of User</Label>
              <Input
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="user@example.com"
              />
              <Button onClick={handleMakeAdmin} className="bg-emerald-600 mx-1 hover:bg-emerald-500">
                Make Admin
              </Button>

              <Button onClick={handleremoveAdmin} className="bg-red-600 mx-1 hover:bg-red-500">
                Make Admin
              </Button>
            </div>
          </div>

          {/* Problems Listing */}
          <h2 className="text-2xl font-bold pt-10">📄 Added Problems</h2>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, tags, difficulty..."
            className="bg-gray-800 text-white placeholder:text-gray-400"
          />
          <div className="space-y-4">
            {filteredProblems.map((p, i) => (
              <Card key={i} className="bg-gray-900 border border-emerald-500">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-lg font-semibold cursor-pointer"
                      onClick={() => setDialogProblem(p)}
                    >
                      {p.title}
                    </h3>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(i)}>
                      Delete
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Day: {p.day} | Date: {p.date}
                  </p>
                  <p className="text-sm text-gray-400">Difficulty: {p.difficulty}</p>
                  <p className="text-sm text-gray-400">Tags: {p.tags}</p>
                  <a href={p.url} target="_blank" className="text-emerald-400 underline text-sm">
                    {p.url}
                  </a>
                </CardContent>
              </Card>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center text-white gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-300">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {dialogProblem && (
          <Dialog open={!!dialogProblem} onOpenChange={() => setDialogProblem(null)}>
            <DialogContent className="bg-gray-900 border border-emerald-600 text-white">
              <DialogHeader>
                <DialogTitle className="text-lg">{dialogProblem.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                <p><strong>Day:</strong> {dialogProblem.day}</p>
                <p><strong>Date:</strong> {dialogProblem.date}</p>
                <p><strong>Difficulty:</strong> {dialogProblem.difficulty}</p>
                <p><strong>Tags:</strong> {dialogProblem.tags}</p>
                <p><strong>URL:</strong> <a href={dialogProblem.url} target="_blank" className="text-emerald-400 underline">{dialogProblem.url}</a></p>
                <Label>📣 Formatted Message:</Label>
                <pre className="whitespace-pre-wrap bg-gray-800 p-2 rounded text-xs border border-emerald-400">
                  {generateFormattedMessage(dialogProblem)}
                </pre>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </main>
  );
}
