import { describe, it, expect, vi } from 'vitest'
import { fetchArtwork } from './itunes'

const makeOkResponse = (artworkUrl100?: string, previewUrl?: string) => ({
  ok: true,
  json: async () => ({
    resultCount: artworkUrl100 ? 1 : 0,
    results: artworkUrl100 ? [{ artworkUrl100, previewUrl }] : [],
  }),
})

describe('fetchArtwork', () => {
  it('returns a 600px artwork URL when a result is found', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      makeOkResponse('https://example.com/image/100x100bb.jpg')
    )

    const result = await fetchArtwork('ABBA', 'Waterloo', mockFetch as typeof fetch)
    expect(result.imageUrl).toBe('https://example.com/image/600x600bb.jpg')
  })

  it('returns previewUrl when present', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      makeOkResponse('https://example.com/image/100x100bb.jpg', 'https://example.com/preview.m4a')
    )

    const result = await fetchArtwork('ABBA', 'Waterloo', mockFetch as typeof fetch)
    expect(result.previewUrl).toBe('https://example.com/preview.m4a')
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

  it('returns empty object when no results are found', async () => {
    const mockFetch = vi.fn().mockResolvedValue(makeOkResponse())
    const result = await fetchArtwork('Unknown', 'Track', mockFetch as typeof fetch)
    expect(result.imageUrl).toBeUndefined()
    expect(result.previewUrl).toBeUndefined()
  })

  it('returns empty object when the response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    const result = await fetchArtwork('ABBA', 'Waterloo', mockFetch as typeof fetch)
    expect(result.imageUrl).toBeUndefined()
    expect(result.previewUrl).toBeUndefined()
  })
})
