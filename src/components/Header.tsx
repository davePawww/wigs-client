import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { logout } from "@/redux/slices/authSlice";
import { useCheckAuth } from "@/hooks/hooks";

import { RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useCheckAuth();

  // TODO
  // Profile and settings link and pages

  const handleLogout = async () => {
    try {
      await dispatch(logout())
        .then(unwrapResult)
        .then((result) => {
          if (result.success) {
            navigate("/auth/login");
          }
        });
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-neutral-800 p-4 text-white md:px-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-widest">WIGS</h1>
        </div>
        {user && (
          <div className="flex items-center gap-14">
            <NavBar />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-300 bg-blue-400 p-2">
                  <p className="text-xl">{user.name?.charAt(0)}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-42 border-2 border-neutral-600 bg-neutral-700 text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-500" />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <CgProfile />
                    <p>Profile</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MdOutlineSettings />
                    <p>Settings</p>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-neutral-600" />
                <DropdownMenuItem onClick={handleLogout}>
                  <RiLogoutBoxLine /> <p>Log out</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {!user && (
          <div className="flex items-center gap-14">
            <NavBar />

            <Button
              variant={"default"}
              className="cursor-pointer bg-neutral-200 text-black hover:scale-105 hover:bg-neutral-400"
              onClick={() => navigate("/auth/login")}
            >
              <RiLoginBoxLine />
              Login
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

function NavBar() {
  return (
    <nav className="flex items-center gap-8 text-sm">
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` ${isActive ? "border-b-2 border-white" : "hover-links"}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/habit-tracker"
        className={({ isActive }) =>
          ` ${isActive ? "border-b-2 border-white" : "hover-links"}`
        }
      >
        Habit Tracker
      </NavLink>
      <NavLink
        to="/pomodoro"
        className={({ isActive }) =>
          ` ${isActive ? "border-b-2 border-white" : "hover-links"}`
        }
      >
        Pomodoro
      </NavLink>
      <NavLink
        to="/documentation"
        className={({ isActive }) =>
          ` ${isActive ? "border-b-2 border-white" : "hover-links"}`
        }
      >
        Docs
      </NavLink>
    </nav>
  );
}
