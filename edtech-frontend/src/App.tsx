import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserRole } from "./types/type";
import SettingsPage from "./components/Settings";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const User = lazy(() => import("./pages/User"));

const App = () => {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<ProtectedRoute role={UserRole.ADMIN} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<ProtectedRoute role={UserRole.PARTICIPANT} />}>
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<SettingsPage/>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

// <Navbar user={ user} />

// <HeroSection />
// <AdminDashboard />
// <ProblemOfTheDay/>
// <ChallengeLog />
// <SolvedProblemsTable />

// <ProgressTracker />
// <CommunitySection />
// <Footer />
