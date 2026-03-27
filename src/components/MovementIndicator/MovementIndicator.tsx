import type { Movement } from '../../types/chart'

interface Props {
  movement: Movement
}

const CONFIG: Record<Movement, { symbol: string; label: string; className: string }> = {
  up: { symbol: '▲', label: 'Up', className: 'text-green-400' },
  down: { symbol: '▼', label: 'Down', className: 'text-red-400' },
  new: { symbol: 'NEW', label: 'New entry', className: 'text-yellow-300 text-xs font-bold' },
  nonmover: { symbol: '—', label: 'No change', className: 'text-gray-400' },
}

export function MovementIndicator({ movement }: Props) {
  const { symbol, label, className } = CONFIG[movement]
  return (
    <span className={`w-10 text-center shrink-0 ${className}`} aria-label={label}>
      {symbol}
    </span>
  )
}
