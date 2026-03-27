import type { ChartEntry as ChartEntryType } from '../../src/types/chart'

interface Props {
  entry: ChartEntryType
}

export function ChartEntry({ entry }: Props) {
  const { position, trackName, artistName, imageUrl } = entry

  const numberBg =
    position === 1
      ? 'bg-totp-orange'
      : position === 2
        ? 'bg-totp-cyan'
        : position === 3
          ? 'bg-totp-yellow'
          : 'bg-white'

  return (
    <li className="flex items-stretch border-2 border-black hover:brightness-110 transition-all">
      <div className={`${numberBg} border-r-2 border-black flex items-center justify-center shrink-0 w-14`}>
        <span className="font-chart text-3xl text-black leading-none">{position}</span>
      </div>

      <div className="bg-totp-orange border-r-2 border-black flex-1 min-w-0 px-3 py-2 flex flex-col justify-center">
        <p className="font-black text-black uppercase text-sm leading-tight truncate tracking-wide">
          {artistName}
        </p>
        <p className="font-bold text-black/70 uppercase text-xs leading-tight truncate tracking-wide">
          {trackName}
        </p>
      </div>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="w-16 h-16 object-cover shrink-0"
          aria-hidden="true"
        />
      ) : (
        <div className="w-16 h-16 bg-black shrink-0" />
      )}
    </li>
  )
}
