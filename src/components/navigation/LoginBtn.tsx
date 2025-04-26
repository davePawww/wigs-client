import { Button } from "@/components/ui/button";
import { resetError } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { RiLoginBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigate = () => {
    dispatch(resetError());
    navigate("/auth/login");
  };

  return (
    <Button
      className="cursor-pointer border border-indigo-300/10 shadow-[0_0_15px_0_rgba(75,0,130,0.5)]"
      onClick={handleNavigate}
    >
      <RiLoginBoxLine />
      <p className="text-xs">Login</p>
    </Button>
  );
}
