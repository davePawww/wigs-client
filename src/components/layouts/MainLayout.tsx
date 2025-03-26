import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout flex min-h-svh flex-col bg-neutral-900">
      <Header />
      <div className="mx-auto flex max-w-5xl flex-col">{children}</div>
      <Footer />
    </div>
  );
}
