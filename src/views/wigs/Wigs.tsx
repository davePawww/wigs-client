import { useCheckAuth } from "@/hooks/hooks";

export default function Wigs() {
  const { user } = useCheckAuth();
  console.log(user);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (status === "success" || status === "error") {
  //     if (!user) {
  //       navigate("/auth/login", { replace: true });
  //     }
  //   }
  // }, [user, navigate, status]);

  return <>{user ? user.name : "No user"}</>;
}
