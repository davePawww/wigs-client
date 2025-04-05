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
      variant={"default"}
      className="cursor-pointer bg-neutral-200 text-black hover:scale-105 hover:bg-neutral-400"
      onClick={handleNavigate}
    >
      <RiLoginBoxLine />
      Login
    </Button>
  );
}
