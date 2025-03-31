import { useCheckAuth } from "@/hooks/hooks";
import NavBar from "@/components/navigation/NavBar";
import UserIconDropdown from "./navigation/UserIconDropdown";
import LoginBtn from "./navigation/LoginBtn";

export default function Header() {
  const { user } = useCheckAuth();

  return (
    <header className="flex items-center justify-between bg-neutral-800 p-4 text-white md:px-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-widest">WIGS</h1>
        </div>
        <div className="flex items-center gap-14">
          <NavBar />
          {user ? <UserIconDropdown user={user} /> : <LoginBtn />}
        </div>
      </div>
    </header>
  );
}
