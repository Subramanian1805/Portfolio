export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-center text-white">
      <div>
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.32em] text-brand-cyan">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-slate-300">
          The page you’re looking for does not exist.
        </p>
      </div>
    </main>
  );
}
