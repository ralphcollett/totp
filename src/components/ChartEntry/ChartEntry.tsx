import type { ChartEntry as ChartEntryType } from '../../types/chart'

interface Props {
  entry: ChartEntryType
}

export function ChartEntry({ entry }: Props) {
  const { position, trackName, artistName, imageUrl } = entry

  const positionClass =
    position === 1
      ? 'text-chart-gold'
      : position === 2
        ? 'text-chart-silver'
        : position === 3
          ? 'text-chart-bronze'
          : 'text-white'

  if (position === 1) {
    return (
      <li className="flex items-center gap-3 bg-chart-card rounded-xl pl-4 pr-4 py-4 hover:brightness-110 transition-all">
        <span className={`font-chart text-5xl w-14 text-right shrink-0 ${positionClass}`}>
          {position}
        </span>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="w-20 h-20 rounded-lg object-cover shrink-0"
            aria-hidden="true"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-lg truncate">{trackName}</p>
          <p className="text-sm text-gray-300 truncate">{artistName}</p>
        </div>
      </li>
    )
  }

  if (position === 2 || position === 3) {
    return (
      <li className="flex items-center gap-3 bg-chart-card rounded-lg pl-4 pr-3 py-3 hover:brightness-110 transition-all">
        <span className={`font-chart text-4xl w-14 text-right shrink-0 ${positionClass}`}>
          {position}
        </span>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="w-14 h-14 rounded object-cover shrink-0"
            aria-hidden="true"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white truncate">{trackName}</p>
          <p className="text-sm text-gray-300 truncate">{artistName}</p>
        </div>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 bg-chart-card rounded-lg pl-4 pr-2 py-2 hover:brightness-110 transition-all">
      <span className={`font-chart text-3xl w-14 text-right shrink-0 ${positionClass}`}>
        {position}
      </span>
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="w-10 h-10 rounded object-cover shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-sm truncate">{trackName}</p>
        <p className="text-xs text-gray-300 truncate">{artistName}</p>
      </div>
    </li>
  )
}
