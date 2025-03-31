import { cn } from "@/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-4 w-4 animate-spin rounded-full border-3", className)}
    />
  );
}
