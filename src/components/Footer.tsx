export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-neutral-900/30 py-4">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-1 text-center">
          <p className="text-xs text-white/40 transition-colors hover:text-white/60">
            © 2025 WIGS by Dave Paurillo.
          </p>
          <p className="text-xs text-white/40 transition-colors hover:text-white/60">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
