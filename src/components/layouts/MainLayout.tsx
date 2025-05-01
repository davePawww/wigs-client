import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="main-layout flex min-h-svh flex-col bg-neutral-900">
      <Header />
      <main className="flex w-full flex-1 items-center justify-center py-4">
        <div className="mx-auto flex max-w-5xl flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
