import { Button } from "@/components/ui/button";
import { RiLoginBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function LoginBtn() {
  const navigate = useNavigate();

  return (
    <Button
      variant={"default"}
      className="cursor-pointer bg-neutral-200 text-black hover:scale-105 hover:bg-neutral-400"
      onClick={() => navigate("/auth/login")}
    >
      <RiLoginBoxLine />
      Login
    </Button>
  );
}
