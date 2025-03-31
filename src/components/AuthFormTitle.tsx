export default function AuthFormTitle({ title }: { title: string }) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <h1 className="text-center text-3xl text-white">{title}</h1>
    </div>
  );
}
