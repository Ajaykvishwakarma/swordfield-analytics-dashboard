import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  LinearProgress,
} from '@mui/material';
import type { CryptoDetailData } from '../../features/crypto/types';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';

interface MarketStatsProps {
  data: CryptoDetailData;
}

interface StatItemProps {
  label: string;
  value: string | number;
  change?: number;
  showProgress?: boolean;
  progress?: number;
}

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  change,
  showProgress,
  progress
}) => (
  <Box>
    <Typography variant="caption" color="text.secondary" gutterBottom>
      {label}
    </Typography>
    <Typography variant="h6" fontWeight="medium">
      {value}
    </Typography>
    {change !== undefined && (
      <Typography
        variant="caption"
        color={change >= 0 ? 'success.main' : 'error.main'}
      >
        {formatPercentage(change)}
      </Typography>
    )}
    {showProgress && progress !== undefined && (
      <Box mt={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    )}
  </Box>
);

export const MarketStats: React.FC<MarketStatsProps> = ({ data }) => {
  const { market_data } = data;

  const circulatingSupplyPercentage = market_data.max_supply
    ? (market_data.circulating_supply / market_data.max_supply) * 100
    : 0;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Market Statistics
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 6, md: 3 }}>
          <StatItem
            label="Market Cap"
            value={formatCurrency(market_data.market_cap.usd, 0)}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <StatItem
            label="24h Volume"
            value={formatCurrency(market_data.total_volume.usd, 0)}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <StatItem
            label="24h Change"
            value={formatPercentage(market_data.price_change_percentage_24h)}
            change={market_data.price_change_percentage_24h}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <StatItem
            label="7d Change"
            value={formatPercentage(market_data.price_change_percentage_7d)}
            change={market_data.price_change_percentage_7d}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }} >
          <StatItem
            label="Circulating Supply"
            value={`${formatNumber(market_data.circulating_supply)} ${data.symbol.toUpperCase()}`}
            showProgress={!!market_data.max_supply}
            progress={circulatingSupplyPercentage}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 4 }}>
          <StatItem
            label="Total Supply"
            value={market_data.total_supply
              ? `${formatNumber(market_data.total_supply)} ${data.symbol.toUpperCase()}`
              : 'N/A'
            }
          />
        </Grid>

        <Grid size={{ xs: 6, md: 4 }}>
          <StatItem
            label="Max Supply"
            value={market_data.max_supply
              ? `${formatNumber(market_data.max_supply)} ${data.symbol.toUpperCase()}`
              : '∞'
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
};