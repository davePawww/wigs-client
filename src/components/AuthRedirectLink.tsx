import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function AuthRedirectLink({
  message,
  link,
  linkText,
  className,
}: {
  message?: string;
  link: string;
  linkText: string;
  className?: string;
}) {
  return (
    <p className={cn("text-center text-xs text-zinc-100/50", className)}>
      {message}{" "}
      <Link to={link} className="text-blue-300">
        {linkText}
      </Link>
    </p>
  );
}
