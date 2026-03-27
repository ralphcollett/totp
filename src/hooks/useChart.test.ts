import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useChart } from './useChart'
import * as lastfmService from '../services/lastfm'
import * as itunesService from '../services/itunes'
import type { LastFmGeoTopTracksResponse } from '../types/chart'

const makeResponse = (
  tracks: LastFmGeoTopTracksResponse['tracks']['track']
): LastFmGeoTopTracksResponse => ({
  tracks: {
    track: tracks,
    '@attr': {
      country: 'United Kingdom',
      page: '1',
      perPage: '10',
      totalPages: '1',
      total: '10',
    },
  },
})

const makeTrack = (name: string, artist: string, rank: string) => ({
  name,
  duration: '200',
  listeners: '1000',
  url: `https://last.fm/${name}`,
  artist: { name: artist, url: '' },
  image: [] as LastFmGeoTopTracksResponse['tracks']['track'][0]['image'],
  '@attr': { rank },
})

describe('useChart', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in loading state', () => {
    vi.spyOn(lastfmService, 'fetchTopTracks').mockReturnValue(new Promise(() => {}))
    vi.spyOn(itunesService, 'fetchArtwork').mockResolvedValue(undefined)
    const { result } = renderHook(() => useChart())
    expect(result.current.loading).toBe(true)
    expect(result.current.entries).toHaveLength(0)
    expect(result.current.error).toBeNull()
  })

  it('returns entries with artwork on success', async () => {
    vi.spyOn(lastfmService, 'fetchTopTracks').mockResolvedValue(
      makeResponse([makeTrack('Waterloo', 'ABBA', '1')])
    )
    vi.spyOn(itunesService, 'fetchArtwork').mockResolvedValue(
      'https://example.com/art.jpg'
    )

    const { result } = renderHook(() => useChart())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].trackName).toBe('Waterloo')
    expect(result.current.entries[0].imageUrl).toBe('https://example.com/art.jpg')
    expect(result.current.error).toBeNull()
  })

  it('sets error on fetch failure', async () => {
    vi.spyOn(lastfmService, 'fetchTopTracks').mockRejectedValue(
      new Error('Last.fm API error: 403')
    )

    const { result } = renderHook(() => useChart())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Last.fm API error: 403')
    expect(result.current.entries).toHaveLength(0)
  })
})
