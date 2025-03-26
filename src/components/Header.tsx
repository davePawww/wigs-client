import { Button } from "@/components/ui/button";
import { logout } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  // const status = useSelector(getStatus);
  // const error = useSelector(getError);
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
    <header className="flex items-center justify-between bg-neutral-800 p-4 text-white md:px-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div>
          <h1>[appName]</h1>
        </div>
        <Button
          variant={"default"}
          className="cursor-pointer bg-neutral-200 text-black hover:scale-105 hover:bg-neutral-400"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine />
          Logout
        </Button>
      </div>
    </header>
  );
}
