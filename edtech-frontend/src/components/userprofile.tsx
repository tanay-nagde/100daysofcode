"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types/type";
import { ChevronDown, User, Settings, LayoutDashboard, LogOut } from "lucide-react"; // Icons
import { Link } from "react-router";

export function UserProfile({ username , role }: { username: string ,role :UserRole}) {
  const handleProfileClick = () =>{
     console.log( "Navigating to Profile...")};

  const handleDashboardClick = () => console.log("Navigating to Dashboard...");
  const handleLogoutClick = () => console.log("Logging out...");
  console.log("UserProfile component rendered with username:", username); 

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <div className="flex w-44 items-center justify-center gap-1 cursor-pointer text-white bg-gray-900 px-4 py-2 rounded-md border border-emerald-500 hover:bg-gray-800 transition">
          <User className="w-5 h-5 text-emerald-400" /> {/* User Icon */}
          <span className="text-lg text-white font-medium">{username}</span>
          <ChevronDown className="w-4 h-4 text-emerald-400" /> {/* Dropdown Arrow */}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className="bg-gray-900 border border-emerald-500 shadow-md rounded-md w-56 z-10 "
        align="end"
        sideOffset={5}
      >
        {/* My Profile */}
        <DropdownMenuItem 
          className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-600 transition text-white"
          onClick={handleProfileClick}
        >
          <Link to="/user" className="flex items-center gap-3 w-full h-full">
            <User className="w-5 h-5 text-emerald-400" />

            My Profile
          </Link>
        </DropdownMenuItem>

        {/* Settings */}
        <DropdownMenuItem 
          className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-600 transition text-white"
       
        >
          <Link to="/setting" className="flex items-center gap-3 w-full h-full">
            <Settings className="w-5 h-5 text-emerald-400" />
            Settings
          </Link>
        </DropdownMenuItem>

        {/* Dashboard */}
    { role === UserRole.ADMIN && (   <DropdownMenuItem 
          className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-600 transition text-white"
          onClick={handleDashboardClick}
        >
          <Link to="/admin" className="flex items-center gap-3 w-full h-full">
            <LayoutDashboard className="w-5 h-5 text-emerald-400" />
            Dashboard
          </Link>
        </DropdownMenuItem>)
}
        {/* Logout */}
        <DropdownMenuItem 
          className="flex items-center gap-3 px-4 py-2 hover:bg-red-600 transition text-red-400"
          onClick={handleLogoutClick}
        >
          <LogOut className="w-5 h-5 text-red-400" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
