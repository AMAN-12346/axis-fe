export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin dark:border-zinc-700 dark:t-zinc-100"></div>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    </div>
  );
}
