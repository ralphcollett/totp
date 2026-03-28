interface ItunesResult {
  artworkUrl100: string
  previewUrl?: string
}

interface ItunesResponse {
  resultCount: number
  results: ItunesResult[]
}

export interface ItunesArtworkResult {
  imageUrl?: string
  previewUrl?: string
}

export async function fetchArtwork(
  artistName: string,
  trackName: string,
  fetchFn: typeof fetch = fetch
): Promise<ItunesArtworkResult> {
  const params = new URLSearchParams({
    term: `${artistName} ${trackName}`,
    entity: 'song',
    limit: '1',
  })

  const response = await fetchFn(`/itunes-api/search?${params.toString()}`)

  if (!response.ok) return {}

  const data = (await response.json()) as ItunesResponse
  const result = data.results[0]
  if (!result) return {}

  return {
    imageUrl: result.artworkUrl100
      ? result.artworkUrl100.replace('100x100bb', '600x600bb')
      : undefined,
    previewUrl: result.previewUrl,
  }
}
