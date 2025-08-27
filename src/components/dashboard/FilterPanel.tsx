import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Divider,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFilters, resetFilters } from '../../features/crypto/cryptoSlice';
import { MARKET_CAP_FILTERS } from '../../utils/constants';

export const FilterPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.crypto);

  const handleMarketCapChange = (min: number, max: number) => {
    dispatch(setFilters({ minMarketCap: min, maxMarketCap: max }));
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch(setFilters({ minPrice: newValue[0], maxPrice: newValue[1] }));
    }
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <FilterListIcon />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Button size="small" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle2" gutterBottom>
          Market Cap
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={`${filters.minMarketCap}-${filters.maxMarketCap}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              handleMarketCapChange(min, max);
            }}
          >
            {MARKET_CAP_FILTERS.map(filter => (
              <MenuItem key={filter.label} value={`${filter.min}-${filter.max}`}>
                {filter.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Price Range (USD)
        </Typography>
        <Box px={1}>
          <Slider
            value={[filters.minPrice, Math.min(filters.maxPrice, 10000)]}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={10}
            marks={[
              { value: 0, label: '$0' },
              { value: 5000, label: '$5k' },
              { value: 10000, label: '$10k+' },
            ]}
          />
        </Box>
      </Box>
    </Paper>
  );
};