import { describe, it, expect, vi } from 'vitest'
import { fetchTopTracks } from './lastfm'

const makeOkResponse = () => ({
  ok: true,
  json: async () => ({ tracks: { track: [], '@attr': {} } }),
})

describe('fetchTopTracks', () => {
  it('calls the Last.fm API with correct query params', async () => {
    const mockFetch = vi.fn().mockResolvedValue(makeOkResponse())

    await fetchTopTracks({ apiKey: 'test-key' }, mockFetch as typeof fetch)

    const url = new URL(mockFetch.mock.calls[0][0] as string)
    expect(url.searchParams.get('method')).toBe('geo.getTopTracks')
    expect(url.searchParams.get('country')).toBe('united kingdom')
    expect(url.searchParams.get('api_key')).toBe('test-key')
    expect(url.searchParams.get('format')).toBe('json')
    expect(url.searchParams.get('limit')).toBe('40')
  })

  it('uses a custom country when provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue(makeOkResponse())

    await fetchTopTracks({ apiKey: 'test-key', country: 'france' }, mockFetch as typeof fetch)

    const url = new URL(mockFetch.mock.calls[0][0] as string)
    expect(url.searchParams.get('country')).toBe('france')
  })

  it('throws an Error when the response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 403 })

    await expect(
      fetchTopTracks({ apiKey: 'bad-key' }, mockFetch as typeof fetch)
    ).rejects.toThrow('Last.fm API error: 403')
  })

  it('returns the parsed JSON response on success', async () => {
    const fakeResponse = {
      tracks: { track: [{ name: 'Test Song' }], '@attr': { country: 'United Kingdom' } },
    }
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fakeResponse,
    })

    const result = await fetchTopTracks({ apiKey: 'test-key' }, mockFetch as typeof fetch)
    expect(result).toEqual(fakeResponse)
  })
})
