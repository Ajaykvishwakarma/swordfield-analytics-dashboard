import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  IconButton,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSorting } from '../../features/crypto/cryptoSlice';
import type { SortOption, SortOrder } from "../../features/crypto/types";
import { SORT_OPTIONS } from '../../utils/constants';

export const SortingControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector(state => state.crypto);

  const handleSortByChange = (value: SortOption) => {
    dispatch(setSorting({ sortBy: value, sortOrder }));
  };

  const toggleSortOrder = () => {
    const newOrder: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ sortBy, sortOrder: newOrder }));
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={toggleSortOrder} color="primary">
        {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => handleSortByChange(e.target.value as SortOption)}
        >
          {SORT_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Box>
  );
};