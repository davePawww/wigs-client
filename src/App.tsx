import { useCheckAuth } from "@/hooks/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";

export default function App() {
  const { user, status } = useCheckAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success" || status === "error") {
      if (!user) {
        navigate("/auth/login", { replace: true });
      }
    }
  }, [user, navigate, status]);

  return (
    <>
      <MainLayout>{user ? user.name : "No user"}</MainLayout>
    </>
  );
}
