export default function AuthFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-[400px] rounded-md border border-zinc-200/40 bg-zinc-950/95 p-8 shadow-lg">
      {children}
    </div>
  );
}
