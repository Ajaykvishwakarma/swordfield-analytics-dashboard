export const formatCurrency = (value: number, decimals = 2): string => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(decimals)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(decimals)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(decimals)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(decimals)}K`;
  } else if (value < 0.01) {
    return `$${value.toFixed(6)}`;
  } else {
    return `$${value.toFixed(decimals)}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};