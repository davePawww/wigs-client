import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { IUser, logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";

export default function UserIconDropdown({ user }: { user: IUser }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <CgProfile />
            <p>Profile</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
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
  );
}
