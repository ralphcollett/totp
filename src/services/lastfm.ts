import type { LastFmGeoTopTracksResponse } from '../types/chart'

export interface LastFmConfig {
  apiKey: string
  country?: string
  limit?: number
}

export async function fetchTopTracks(
  config: LastFmConfig,
  fetchFn: typeof fetch = fetch
): Promise<LastFmGeoTopTracksResponse> {
  const params = new URLSearchParams({
    method: 'geo.getTopTracks',
    country: config.country ?? 'united kingdom',
    api_key: config.apiKey,
    format: 'json',
    limit: String(config.limit ?? 40),
  })

  const response = await fetchFn(
    `https://ws.audioscrobbler.com/2.0/?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error(`Last.fm API error: ${response.status}`)
  }

  return response.json() as Promise<LastFmGeoTopTracksResponse>
}
