import NavBar from "@/components/navigation/NavBar";
import UserIconDropdown from "./navigation/UserIconDropdown";
import LoginBtn from "./navigation/LoginBtn";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/slices/authSlice";

export default function Header() {
  const user = useSelector(getUser);

  return (
    <header className="border-b border-white/5 bg-neutral-900/30 py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 md:px-8">
        <div>
          <h1 className="text-shadow-xl text-xl font-semibold tracking-tighter text-white shadow-[rgba(75,0,130,0.8)] transition-colors hover:text-white/90">
            WIGS
          </h1>
        </div>
        <div className="flex items-center gap-8 md:gap-14">
          <NavBar />
          {user ? <UserIconDropdown user={user} /> : <LoginBtn />}
        </div>
      </div>
    </header>
  );
}
