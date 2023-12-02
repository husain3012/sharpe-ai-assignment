import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-base-300">
      <Toaster />

      <Navbar />

      <main className="w-full flex flex-col h-full">{<Outlet />}</main>
    </div>
  );
};

export default Layout;
