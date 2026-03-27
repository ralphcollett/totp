import { useChart } from "./hooks/useChart";
import { ChartList } from "./components/ChartList/ChartList";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

function TotpBadge({ position }: { position?: number }) {
  return (
    <div className="border-2 border-black bg-white inline-flex flex-col items-center leading-none w-16 shrink-0">
      <div className="w-full flex items-baseline justify-center gap-0.5 px-1 pt-1">
        <span className="font-black text-black text-xs uppercase tracking-tight">TOP</span>
      </div>
      <div className="relative w-full flex items-center justify-center py-0.5">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex">
          <div className="h-4 bg-white flex-1" />
          <div className="h-4 bg-totp-cyan flex-1" />
        </div>
        <span className="relative font-chart text-totp-orange text-3xl leading-none z-10">
          {position ?? 1}
        </span>
      </div>
      <div className="w-full flex">
        <div className="bg-white flex-1 flex items-center justify-center">
          <span className="font-black text-black text-xs uppercase">of</span>
        </div>
        <div className="bg-totp-blue flex-1 flex items-center justify-center">
          <span className="font-black text-white text-xs uppercase tracking-tight">POPS</span>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const { entries, loading, error } = useChart();

  const weekOf = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-totp-bg">
      {/* Header */}
      <header className="border-b-4 border-black flex items-stretch">
        <div className="flex-1 flex flex-col">
          <div className="bg-totp-orange border-b-2 border-black px-4 py-2">
            <span className="font-chart text-3xl text-black tracking-widest leading-none">
              TOP OF THE POPS
            </span>
          </div>
          <div className="bg-totp-blue px-4 py-1">
            <span className="font-black text-xs text-white uppercase tracking-widest">
              UK Top 10 — {weekOf}
            </span>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto mt-4">
        {loading && <LoadingSpinner />}
        {error && (
          <p role="alert" className="text-red-500 font-bold text-center">
            {error}
          </p>
        )}
        {!loading && !error && <ChartList entries={entries} />}
      </div>
    </main>
  );
}

export default App;
