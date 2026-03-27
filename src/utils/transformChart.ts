import type { ChartEntry, LastFmGeoTopTracksResponse } from '../types/chart'

export function transformChart(response: LastFmGeoTopTracksResponse): ChartEntry[] {
  return response.tracks.track.map((track, index) => {
    const largeImage = track.image.find((img) => img.size === 'large')

    return {
      position: index + 1,
      trackName: track.name,
      artistName: track.artist.name,
      imageUrl: largeImage?.['#text'],
      lastFmUrl: track.url,
    }
  })
}
