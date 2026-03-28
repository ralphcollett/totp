import { useChart } from "./hooks/useChart";
import { ChartList } from "./components/ChartList/ChartList";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

export function App() {
  const { entries, loading, error } = useChart();

  const weekOf = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen totp-bg">
      {/* Header */}
      <header className="border-b-4 border-black flex items-stretch">
        {/* Left yellow bar */}
        <div className="w-4 bg-totp-yellow border-r-2 border-black shrink-0" />
        {/* Main content */}
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
        {/* Right yellow bar */}
        <div className="w-4 bg-totp-yellow border-l-2 border-black shrink-0" />
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
