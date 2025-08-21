"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { updateUserField } from "@/feature/slice/userslice"; // ✅ Import your action properly

export default function SettingsPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isEditingLeetCode, setIsEditingLeetCode] = useState(false);
  const [leetcodeUsername, setLeetcodeUsername] = useState(user?.leetcode || "");

  const handleSaveLeetCode = () => {
    dispatch(updateUserField({ leetcode: leetcodeUsername }));
    setIsEditingLeetCode(false);
  };

  const toggleLeetCodeEdit = () => {
    if (isEditingLeetCode) {
      handleSaveLeetCode();
    } else {
      setIsEditingLeetCode(true);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center mb-8">⚙️ Settings</h1>

        <Card className="bg-gray-900 border border-emerald-500">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-300">Name</Label>
                <Input
                  value={user?.displayName || ""}
                  disabled
                  className="bg-gray-800 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-300">Email</Label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-800 text-white mt-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-sm text-gray-300">LeetCode Username</Label>
                  <Input
                    value={leetcodeUsername}
                    disabled={!isEditingLeetCode}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                    placeholder="Enter your LeetCode username"
                    className={`bg-gray-800 text-white mt-1 ${!isEditingLeetCode ? "opacity-70 cursor-not-allowed" : ""}`}
                  />
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="border-emerald-500 text-emerald-400"
                    onClick={toggleLeetCodeEdit}
                  >
                    {isEditingLeetCode ? "Save" : user?.leetcode ? "Edit" : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
