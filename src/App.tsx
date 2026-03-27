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
    <main className="min-h-screen bg-chart-bg text-white p-4">
      <h1 className="font-chart text-5xl text-chart-gold text-center mb-2 tracking-widest">
        TOP OF THE POPS
      </h1>
      <p className="text-center text-xs text-gray-400 mb-8 font-retro">
        UK Top 10 — {weekOf}
      </p>
      {loading && <LoadingSpinner />}
      {error && (
        <p role="alert" className="text-red-400 text-center">
          {error}
        </p>
      )}
      {!loading && !error && <ChartList entries={entries} />}
    </main>
  );
}

export default App;
