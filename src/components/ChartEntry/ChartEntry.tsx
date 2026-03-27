import type { ChartEntry as ChartEntryType } from '../../types/chart'

interface Props {
  entry: ChartEntryType
}

export function ChartEntry({ entry }: Props) {
  const positionClass =
    entry.position === 1
      ? 'text-chart-gold'
      : entry.position === 2
        ? 'text-chart-silver'
        : entry.position === 3
          ? 'text-chart-bronze'
          : 'text-white'

  return (
    <li className="flex items-center gap-4 bg-chart-card rounded-lg p-3 hover:brightness-110 transition-all">
      <span className={`font-chart text-4xl w-12 text-right shrink-0 ${positionClass}`}>
        {entry.position}
      </span>
      {entry.imageUrl && (
        <img
          src={entry.imageUrl}
          alt=""
          className="w-12 h-12 rounded object-cover shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white truncate">{entry.trackName}</p>
        <p className="text-sm text-gray-300 truncate">{entry.artistName}</p>
      </div>
    </li>
  )
}
