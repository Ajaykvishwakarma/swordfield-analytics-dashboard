export const CHART_PERIODS = [
  { label: '24H', value: 1 },
  { label: '7D', value: 7 },
  { label: '30D', value: 30 },
  { label: '90D', value: 90 },
  { label: '1Y', value: 365 },
] as const;

export const MARKET_CAP_FILTERS = [
  { label: 'All', min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: '> $10B', min: 10000000000, max: Number.MAX_SAFE_INTEGER },
  { label: '$1B - $10B', min: 1000000000, max: 10000000000 },
  { label: '$100M - $1B', min: 100000000, max: 1000000000 },
  { label: '< $100M', min: 0, max: 100000000 },
] as const;

export const SORT_OPTIONS = [
  { label: 'Market Cap', value: 'market_cap' },
  { label: 'Price', value: 'price' },
  { label: '24h Change', value: 'change_24h' },
  { label: 'Volume', value: 'volume' },
  { label: 'Name', value: 'name' },
] as const;