import { describe, it, expect, vi } from 'vitest'
import { fetchArtwork } from './itunes'

const makeOkResponse = (artworkUrl100?: string) => ({
  ok: true,
  json: async () => ({
    resultCount: artworkUrl100 ? 1 : 0,
    results: artworkUrl100 ? [{ artworkUrl100 }] : [],
  }),
})

describe('fetchArtwork', () => {
  it('returns a 600px artwork URL when a result is found', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      makeOkResponse('https://example.com/image/100x100bb.jpg')
    )

    const url = await fetchArtwork('ABBA', 'Waterloo', mockFetch as typeof fetch)
    expect(url).toBe('https://example.com/image/600x600bb.jpg')
  })

  it('searches using artist name and track name', async () => {
    const mockFetch = vi.fn().mockResolvedValue(makeOkResponse())

    await fetchArtwork('ABBA', 'Waterloo', mockFetch as typeof fetch)

    const calledPath = mockFetch.mock.calls[0][0] as string
    const params = new URLSearchParams(calledPath.split('?')[1])
    expect(params.get('term')).toBe('ABBA Waterloo')
    expect(params.get('entity')).toBe('song')
    expect(params.get('limit')).toBe('1')
  })

  it('returns undefined when no results are found', async () => {
    const mockFetch = vi.fn().mockResolvedValue(makeOkResponse())
    const url = await fetchArtwork('Unknown', 'Track', mockFetch as typeof fetch)
    expect(url).toBeUndefined()
  })

  it('returns undefined when the response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    const url = await fetchArtwork('ABBA', 'Waterloo', mockFetch as typeof fetch)
    expect(url).toBeUndefined()
  })
})
