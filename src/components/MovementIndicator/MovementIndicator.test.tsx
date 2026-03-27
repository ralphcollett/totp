import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MovementIndicator } from './MovementIndicator'

describe('MovementIndicator', () => {
  it('renders an accessible "Up" label for up movement', () => {
    render(<MovementIndicator movement="up" />)
    expect(screen.getByLabelText('Up')).toBeInTheDocument()
  })

  it('renders an accessible "Down" label for down movement', () => {
    render(<MovementIndicator movement="down" />)
    expect(screen.getByLabelText('Down')).toBeInTheDocument()
  })

  it('renders "NEW" text for new entries', () => {
    render(<MovementIndicator movement="new" />)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('renders an accessible "No change" label for nonmover', () => {
    render(<MovementIndicator movement="nonmover" />)
    expect(screen.getByLabelText('No change')).toBeInTheDocument()
  })
})
