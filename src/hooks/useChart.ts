import { useEffect, useState } from 'react'
import type { ChartEntry } from '../types/chart'
import { fetchTopTracks } from '../services/lastfm'
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

    fetchTopTracks({ apiKey })
      .then((response) => {
        setEntries(transformChart(response))
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error')
      })
      .finally(() => setLoading(false))
  }, [])

  return { entries, loading, error }
}
