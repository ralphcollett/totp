interface ItunesResult {
  artworkUrl100: string
}

interface ItunesResponse {
  resultCount: number
  results: ItunesResult[]
}

export async function fetchArtwork(
  artistName: string,
  trackName: string,
  fetchFn: typeof fetch = fetch
): Promise<string | undefined> {
  const params = new URLSearchParams({
    term: `${artistName} ${trackName}`,
    entity: 'song',
    limit: '1',
  })

  const response = await fetchFn(`/itunes-api/search?${params.toString()}`)

  if (!response.ok) return undefined

  const data = (await response.json()) as ItunesResponse

  const url = data.results[0]?.artworkUrl100
  if (!url) return undefined

  return url.replace('100x100bb', '600x600bb')
}
