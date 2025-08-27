import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useMarketChart } from '../../hooks/useCryptoData';
import { CHART_PERIODS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

interface PriceChartProps {
  cryptoId: string;
  name: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ cryptoId, name }) => {
  const [period, setPeriod] = useState(7);
  const { data: chartData, isLoading, error } = useMarketChart(cryptoId, period);

  const handlePeriodChange = (event: React.MouseEvent<HTMLElement>, newPeriod: number | null) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  const formattedData = chartData?.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    time: timestamp,
    price: price,
  })) || [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(payload[0].payload.time).toLocaleString()}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatCurrency(payload[0].value)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <Typography color="error">Failed to load chart data</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">{name} Price Chart</Typography>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          size="small"
        >
          {CHART_PERIODS.map(p => (
            <ToggleButton key={p.value} value={p.value}>
              {p.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(value, 0)}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};