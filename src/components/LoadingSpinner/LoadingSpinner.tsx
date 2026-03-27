export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16" role="status" aria-label="Loading chart">
      <div className="w-12 h-12 border-4 border-totp-orange border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
