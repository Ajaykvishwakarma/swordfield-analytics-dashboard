import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FilterOptions, SortOption, SortOrder } from "./types";

interface CryptoState {
  filters: FilterOptions;
  sortBy: SortOption;
  sortOrder: SortOrder;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: CryptoState = {
  filters: {
    minMarketCap: 0,
    maxMarketCap: Number.MAX_SAFE_INTEGER,
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
    searchQuery: '',
  },
  sortBy: 'market_cap',
  sortOrder: 'desc',
  currentPage: 1,
  itemsPerPage: 20,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; 
    },
    setSorting: (state, action: PayloadAction<{ sortBy: SortOption; sortOrder: SortOrder }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
    },
  },
});

export const { setFilters, setSorting, setCurrentPage, resetFilters } = cryptoSlice.actions;
export default cryptoSlice.reducer;