import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ChartList } from './ChartList'
import type { ChartEntry } from '../../types/chart'

const makeEntry = (position: number): ChartEntry => ({
  position,
  trackName: `Song ${position}`,
  artistName: `Artist ${position}`,
  weeksInChart: 1,
  movement: 'new',
})

describe('ChartList', () => {
  it('renders the correct number of list items', () => {
    const entries = [makeEntry(1), makeEntry(2), makeEntry(3)]
    render(<ChartList entries={entries} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders an empty list when entries is empty', () => {
    render(<ChartList entries={[]} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('has an accessible label', () => {
    render(<ChartList entries={[makeEntry(1)]} />)
    expect(screen.getByRole('list', { name: 'UK Top 40 chart' })).toBeInTheDocument()
  })
})
