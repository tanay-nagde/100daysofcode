import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery, setUser } from "@/feature/slice/userslice";
import { RootState } from "@/store/store";
import { useGetAllChallengesQuery } from "@/feature/slice/problemslice";
import { setProblems } from "@/feature/slice/problemslice";

const UserBootstrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);

  const { data: userData, isLoading, isSuccess } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });

  const { data: allProblems } = useGetAllChallengesQuery();

  useEffect(() => {
    if (isSuccess && userData && !user) {
      dispatch(setUser(userData));
    }
  }, [isSuccess, userData, user, dispatch]);

  useEffect(() => {
    if (allProblems?.challenges) {
      dispatch(setProblems(allProblems.challenges));
    }
  }, [allProblems, dispatch]);

  if (loading || isLoading) {
    return <div className="text-white text-center p-6">Loading app...</div>;
  }

  return <>{children}</>;
};

export default UserBootstrapper;
