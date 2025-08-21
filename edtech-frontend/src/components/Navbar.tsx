"use client";

import { useState } from "react";
import { User, UserRole } from "@/types/type";
import { UserProfile } from "./userprofile";
import { Menu } from "lucide-react";
import { MobileUserSidebar } from "./MobileSideBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


function Navbar( ) {
  const user = useSelector((state: RootState) => state.user.user);

  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const username = user?.displayName.split(" ")[0] || ""; // Default to "Guest" if no username is available
  console.log("user from navbar"); 

  return (
    <header className="container  mx-auto py-4 px-4 flex justify-between items-center">
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2810%29-kxciRraI4NfYkA8JkL3zqlVTsb9fFp.png"
          alt="SVVIT Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h2 className="text-sm text-white md:text-base font-medium">
          Shri Vaishnav Institute of Information Technology
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Desktop User Profile */}
        <div className="hidden md:block">
          {user ?  (
            <UserProfile username={username} role={user.role} />
          ) : (
            <button
              className="px-6 py-3 text-white bg-gray-900 border border-emerald-500 rounded-md 
                   hover:bg-emerald-600 hover:border-emerald-400 transition 
                   shadow-md shadow-emerald-500/20"
              onClick={() =>
                (window.location.href = "http://localhost:3000/auth/google")
              }
            >
              Login with Google
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        { (
          <div className="md:hidden">
            <Menu
              className="w-7 h-7 text-white cursor-pointer"
              onClick={() => setMobileSidebarOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      <MobileUserSidebar 
        open={isMobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        username={username}
      />
    </header>
  );
}

export default Navbar;
