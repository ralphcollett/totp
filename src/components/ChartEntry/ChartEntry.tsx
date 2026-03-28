import { useEffect, useRef } from 'react'
import type { ChartEntry as ChartEntryType } from '../../types/chart'

interface Props {
  entry: ChartEntryType
  isPlaying: boolean
  onPlay: () => void
}

export function ChartEntry({ entry, isPlaying, onPlay }: Props) {
  const { position, trackName, artistName, imageUrl, previewUrl } = entry
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

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

      {/* Album art + play button */}
      <div className="relative w-16 h-16 shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        {previewUrl && (
          <>
            <audio ref={audioRef} src={previewUrl} />
            <button
              onClick={onPlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <rect x="4" y="3" width="4" height="14" rx="1" />
                  <rect x="12" y="3" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <polygon points="5,3 17,10 5,17" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
    </li>
  )
}
