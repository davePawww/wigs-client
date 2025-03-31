export default function ErrorMessage({ error }: { error: string | undefined }) {
  return (
    <>{error ? <p className="text-sm text-red-700">{error}</p> : <p> </p>}</>
  );
}
