import type { ChartEntry as ChartEntryType } from '../../types/chart'
import { ChartEntry } from '../ChartEntry/ChartEntry'

interface Props {
  entries: ChartEntryType[]
}

export function ChartList({ entries }: Props) {
  return (
    <ol className="max-w-2xl mx-auto space-y-2" aria-label="UK Top 40 chart">
      {entries.map((entry) => (
        <ChartEntry key={`${entry.artistName}-${entry.trackName}`} entry={entry} />
      ))}
    </ol>
  )
}
