import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginBtn({
  status,
  activeBtn,
}: {
  status: string;
  activeBtn: string;
}) {
  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_API_URL}/auth/google`;
  };

  return (
    <Button
      disabled={status === "loading"}
      variant="default"
      className="mx-auto mb-4 block w-3/4 cursor-pointer bg-neutral-200 hover:scale-105 hover:bg-neutral-400"
      onClick={handleGoogleLogin}
    >
      <div className="flex items-center justify-center gap-2">
        {status === "loading" && activeBtn === "google" ? (
          <>
            <Spinner className="border-neutral-600 border-t-neutral-900" />
            <p className="text-black">Signing in ...</p>
          </>
        ) : (
          <>
            <p className="text-black">Continue with Google</p>
            <FcGoogle />
          </>
        )}
      </div>
    </Button>
  );
}
