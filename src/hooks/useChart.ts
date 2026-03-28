import { useEffect, useState } from 'react'
import type { ChartEntry } from '../types/chart'
import { fetchTopTracks } from '../services/lastfm'
import { fetchArtwork } from '../services/itunes'
import { transformChart } from '../utils/transformChart'

export interface UseChartResult {
  entries: ChartEntry[]
  loading: boolean
  error: string | null
}

export function useChart(): UseChartResult {
  const [entries, setEntries] = useState<ChartEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY as string

    fetchTopTracks({ apiKey, limit: 40 })
      .then(async (response) => {
        const chart = transformChart(response)
        const itunesResults = await Promise.all(
          chart.map((entry) => fetchArtwork(entry.artistName, entry.trackName))
        )
        setEntries(
          chart.map((entry, i) => ({
            ...entry,
            imageUrl: itunesResults[i].imageUrl,
            previewUrl: itunesResults[i].previewUrl,
            itunesUrl: itunesResults[i].itunesUrl,
          }))
        )
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error')
      })
      .finally(() => setLoading(false))
  }, [])

  return { entries, loading, error }
}
