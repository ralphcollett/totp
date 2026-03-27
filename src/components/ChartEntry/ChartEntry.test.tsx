import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ChartEntry } from './ChartEntry'
import type { ChartEntry as ChartEntryType } from '../../types/chart'

const makeEntry = (overrides: Partial<ChartEntryType> = {}): ChartEntryType => ({
  position: 1,
  trackName: 'Waterloo',
  artistName: 'ABBA',
  ...overrides,
})

describe('ChartEntry', () => {
  it('renders the track name', () => {
    render(<ChartEntry entry={makeEntry()} />)
    expect(screen.getByText('Waterloo')).toBeInTheDocument()
  })

  it('renders the artist name', () => {
    render(<ChartEntry entry={makeEntry()} />)
    expect(screen.getByText('ABBA')).toBeInTheDocument()
  })

  it('renders the chart position', () => {
    render(<ChartEntry entry={makeEntry({ position: 5 })} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders an image when imageUrl is provided', () => {
    const { container } = render(
      <ChartEntry entry={makeEntry({ imageUrl: 'https://example.com/cover.jpg' })} />
    )
    expect(container.querySelector('img')).toBeInTheDocument()
  })

  it('does not render an image when imageUrl is absent', () => {
    const { container } = render(<ChartEntry entry={makeEntry({ imageUrl: undefined })} />)
    expect(container.querySelector('img')).not.toBeInTheDocument()
  })
})
