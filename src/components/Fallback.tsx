import { Button } from "@/components/ui/button";

export default function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const handleResetErrorBoundary = () => {
    resetErrorBoundary();
  };

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button onClick={handleResetErrorBoundary}>Try again</Button>
    </div>
  );
}
