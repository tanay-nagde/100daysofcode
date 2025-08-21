// components/ProtectedRoute.tsx

import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { UserRole } from "@/types/type";

interface ProtectedRouteProps {
  role?: UserRole; // optional, so you can protect any route even without roles
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  console.log("user from pr", user);
  console.log("role from pr", role , user?.role , UserRole.ADMIN);

  if (loading) {
    return <div className="">Loading...</div>;
  }

  if (!user) {
    // not logged in → redirect to login with message
    return (
      // <Navigate
      //   to="/"
      //   replace
      //   state={{
      //     from: location.pathname,
      //     message: "Please log in to access this page",
      //     type: "error",
      //   }}
      // />
      <h1 className="text-2xl text-center mt-10">
        Please log in to access this page
        <br />
        <span className="text-lg text-gray-500">Redirecting...</span>
        <br />  
        </h1>
    );
  }

  if  (!(user.role == role || user.role == UserRole.ADMIN)) {
    // role mismatch
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location.pathname,
          message: "You are not authorized to access this page",
          type: "error",
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
