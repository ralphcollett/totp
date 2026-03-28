export interface ChartEntry {
  position: number
  trackName: string
  artistName: string
  imageUrl?: string
  previewUrl?: string
  lastFmUrl?: string
}

export interface LastFmTrack {
  name: string
  duration: string
  listeners: string
  url: string
  artist: {
    name: string
    url: string
  }
  image: Array<{
    '#text': string
    size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | ''
  }>
  '@attr': {
    rank: string
  }
}

export interface LastFmGeoTopTracksResponse {
  tracks: {
    track: LastFmTrack[]
    '@attr': {
      country: string
      page: string
      perPage: string
      totalPages: string
      total: string
    }
  }
}
