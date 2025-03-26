import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-stone-800">
      <img
        src="/bg.jpg"
        alt="background art"
        className="absolute z-0 h-full min-h-svh w-full object-cover"
      />
      <div className="z-10">
        <Outlet />
      </div>
    </main>
  );
}
