import type { ChartEntry as ChartEntryType } from '../../types/chart'

interface Props {
  entry: ChartEntryType
}

export function ChartEntry({ entry }: Props) {
  const { position, trackName, artistName, imageUrl } = entry

  return (
    <li className="flex items-stretch border-2 border-black bg-white hover:brightness-95 transition-all">
      {/* Position badge */}
      <div className="border-r-2 border-black bg-white flex items-center justify-center shrink-0 w-12">
        <span className="font-chart text-totp-orange text-3xl leading-none">{position}</span>
      </div>

      {/* Artist + track name bars */}
      <div className="flex-1 min-w-0 flex flex-col border-r-2 border-black">
        <div className="bg-totp-orange border-b border-black px-3 py-1.5 flex-1 flex items-center">
          <p className="font-black text-black uppercase text-sm leading-none truncate tracking-wide">
            {artistName}
          </p>
        </div>
        <div className="bg-totp-blue px-3 py-1.5 flex-1 flex items-center">
          <p className="font-bold text-white uppercase text-xs leading-none truncate tracking-wide">
            {trackName}
          </p>
        </div>
      </div>

      {/* Album art */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="w-16 h-16 object-cover shrink-0"
          aria-hidden="true"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 shrink-0" />
      )}
    </li>
  )
}
