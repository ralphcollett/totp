import { describe, it, expect } from 'vitest'
import { transformChart } from './transformChart'
import type { LastFmGeoTopTracksResponse } from '../types/chart'

const makeTrack = (name: string, artist: string, rank: string) => ({
  name,
  duration: '200',
  listeners: '1000',
  url: `https://last.fm/${name}`,
  artist: { name: artist, url: '' },
  image: [] as [],
  '@attr': { rank },
})

const makeResponse = (
  tracks: ReturnType<typeof makeTrack>[]
): LastFmGeoTopTracksResponse => ({
  tracks: {
    track: tracks,
    '@attr': {
      country: 'United Kingdom',
      page: '1',
      perPage: '40',
      totalPages: '1',
      total: '40',
    },
  },
})

describe('transformChart', () => {
  it('assigns positions starting at 1', () => {
    const response = makeResponse([makeTrack('Song A', 'Artist A', '1')])
    const [entry] = transformChart(response)
    expect(entry.position).toBe(1)
  })

  it('assigns sequential positions', () => {
    const response = makeResponse([
      makeTrack('Song A', 'Artist A', '1'),
      makeTrack('Song B', 'Artist B', '2'),
    ])
    const result = transformChart(response)
    expect(result[0].position).toBe(1)
    expect(result[1].position).toBe(2)
  })

  it('maps track and artist names correctly', () => {
    const response = makeResponse([makeTrack('Waterloo', 'ABBA', '1')])
    const [entry] = transformChart(response)
    expect(entry.trackName).toBe('Waterloo')
    expect(entry.artistName).toBe('ABBA')
  })

  it('maps the Last.fm URL', () => {
    const response = makeResponse([makeTrack('Waterloo', 'ABBA', '1')])
    const [entry] = transformChart(response)
    expect(entry.lastFmUrl).toBe('https://last.fm/Waterloo')
  })

  it('picks the largest available non-empty image', () => {
    const track = {
      ...makeTrack('Waterloo', 'ABBA', '1'),
      image: [
        { '#text': '', size: 'large' as const },
        { '#text': 'https://img/extralarge.jpg', size: 'extralarge' as const },
        { '#text': 'https://img/medium.jpg', size: 'medium' as const },
      ],
    }
    const [entry] = transformChart(makeResponse([track]))
    expect(entry.imageUrl).toBe('https://img/extralarge.jpg')
  })

  it('skips images with empty #text', () => {
    const track = {
      ...makeTrack('Waterloo', 'ABBA', '1'),
      image: [
        { '#text': '', size: 'large' as const },
        { '#text': '', size: 'extralarge' as const },
        { '#text': 'https://img/medium.jpg', size: 'medium' as const },
      ],
    }
    const [entry] = transformChart(makeResponse([track]))
    expect(entry.imageUrl).toBe('https://img/medium.jpg')
  })

  it('returns undefined imageUrl when all images are empty', () => {
    const track = {
      ...makeTrack('Waterloo', 'ABBA', '1'),
      image: [{ '#text': '', size: 'large' as const }],
    }
    const [entry] = transformChart(makeResponse([track]))
    expect(entry.imageUrl).toBeUndefined()
  })
})
