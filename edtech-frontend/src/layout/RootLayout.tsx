import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const RootLayout: React.FC = () => {
  return (
    <main className="min-h-screen bg-black ">
      <Navbar user={null} />
      <div className="px-4 pt-6">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;
