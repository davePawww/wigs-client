import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main-layout flex min-h-svh flex-col bg-neutral-900">
      <Header />
      <div className="mx-auto flex max-w-5xl flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
