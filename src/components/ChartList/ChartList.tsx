import { useState } from 'react'
import type { ChartEntry as ChartEntryType } from '../../types/chart'
import { ChartEntry } from '../ChartEntry/ChartEntry'

interface Props {
  entries: ChartEntryType[]
}

export function ChartList({ entries }: Props) {
  const [playingPosition, setPlayingPosition] = useState<number | null>(null)

  function handlePlay(position: number) {
    setPlayingPosition((current) => (current === position ? null : position))
  }

  return (
    <ol className="max-w-2xl mx-auto space-y-1" aria-label="UK Top 10 chart">
      {entries.map((entry) => (
        <ChartEntry
          key={`${entry.artistName}-${entry.trackName}`}
          entry={entry}
          isPlaying={playingPosition === entry.position}
          onPlay={() => handlePlay(entry.position)}
        />
      ))}
    </ol>
  )
}
