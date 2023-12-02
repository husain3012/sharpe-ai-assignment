import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-base-300">
      <Toaster />

      <Navbar />

      <main className="w-full flex flex-col h-full p-4 overflow-y-auto">
        {<Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
