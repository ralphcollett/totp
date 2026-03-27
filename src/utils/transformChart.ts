import type { ChartEntry, LastFmGeoTopTracksResponse } from '../types/chart'

export function transformChart(response: LastFmGeoTopTracksResponse): ChartEntry[] {
  return response.tracks.track.map((track, index) => {
    const IMAGE_SIZE_PREFERENCE = ['extralarge', 'mega', 'large', 'medium', 'small'] as const
    const imageUrl = IMAGE_SIZE_PREFERENCE.map((size) =>
      track.image.find((img) => img.size === size && img['#text'])?.['#text']
    ).find(Boolean)

    return {
      position: index + 1,
      trackName: track.name,
      artistName: track.artist.name,
      imageUrl,
      lastFmUrl: track.url,
    }
  })
}
