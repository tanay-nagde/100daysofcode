"use client";

import { LayoutDashboard, LogOut, Settings, User, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";

type Props = {
  open: boolean;
  onClose: () => void;
  username: string;
};

export function MobileUserSidebar({ open, onClose, username }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  if (typeof window === "undefined" || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-[75%] max-w-sm bg-gray-900 text-white h-full shadow-lg p-6 animate-slide-in-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {username ? `Hello, ${username} 👋` : `Welcome!`}
          </h2>
          <X className="cursor-pointer text-white" onClick={onClose} />
        </div>

        {username ? (
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-emerald-600 transition"
              onClick={() => {
                console.log("Navigating to Profile...");
                onClose();
              }}
            ><Link to="/user" className="flex items-center gap-3 w-full h-full">
              <User className="w-5 h-5 text-emerald-400" />
              My Profile
            </Link>
            </button>

            <button
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-emerald-600 transition"
              onClick={() => {
                console.log("Opening Settings...");
                onClose();
              }}
            >
            <Link to="/setting" className="flex items-center gap-3 w-full h-full">
              <Settings className="w-5 h-5 text-emerald-400" />
              Settings
            </Link>
            </button>

            <button
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-emerald-600 transition"
              onClick={() => {
                console.log("Navigating to Dashboard...");
                onClose();
              }}
            >
            <Link to="/admin" className="flex items-center gap-3 w-full h-full">
              <LayoutDashboard className="w-5 h-5 text-emerald-400" />
              Dashboard
            </Link>
            </button>

            <button
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-600 transition text-red-400"
              onClick={() => {
                console.log("Logging out...");
                onClose();
              }}
            >
              <LogOut className="w-5 h-5 text-red-400" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              onClick={() =>
                (window.location.href = "http://localhost:3000/auth/google")
              }
              className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition text-center"
            >
              Login with Google
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
