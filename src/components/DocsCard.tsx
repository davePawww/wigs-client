export default function DocsCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-1">
      <h1 className="text-xl tracking-wide">{title}</h1>
      <p className="text-sm text-white/80">{description}</p>
    </div>
  );
}
