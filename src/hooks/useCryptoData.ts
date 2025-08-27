import { useQuery, useInfiniteQuery } from 'react-query';
import { cryptoService } from '../services/cryptoService';
import { useAppSelector } from '../store/hooks';
import type { Cryptocurrency } from "../features/crypto/types";

export const useCryptoMarketsPaginated = (page: number = 1, itemsPerPage: number = 20) => {
  const { filters, sortBy, sortOrder } = useAppSelector(state => state.crypto);

  return useQuery(
    ['cryptoMarkets', page, itemsPerPage, filters, sortBy, sortOrder],
    async () => {
      const data = await cryptoService.getMarkets('usd', page, itemsPerPage, true);
      
      let filtered = data.filter((coin: Cryptocurrency) => {
        const matchesSearch = coin.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                            coin.symbol.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesMarketCap = coin.market_cap >= filters.minMarketCap && 
                                coin.market_cap <= filters.maxMarketCap;
        const matchesPrice = coin.current_price >= filters.minPrice && 
                            coin.current_price <= filters.maxPrice;
        
        return matchesSearch && matchesMarketCap && matchesPrice;
      });

      filtered.sort((a: Cryptocurrency, b: Cryptocurrency) => {
        let comparison = 0;
        switch (sortBy) {
          case 'market_cap':
            comparison = a.market_cap - b.market_cap;
            break;
          case 'price':
            comparison = a.current_price - b.current_price;
            break;
          case 'change_24h':
            comparison = a.price_change_percentage_24h - b.price_change_percentage_24h;
            break;
          case 'volume':
            comparison = a.total_volume - b.total_volume;
            break;
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });

      return {
        data: filtered,
        totalCount: 1000, 
        hasMore: data.length === itemsPerPage,
      };
    },
    {
      keepPreviousData: true, 
      staleTime: 30000, 
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCryptoMarkets = () => {
  const { filters, sortBy, sortOrder, itemsPerPage } = useAppSelector(state => state.crypto);

  return useInfiniteQuery(
    ['cryptoMarketsInfinite', filters, sortBy, sortOrder],
    async ({ pageParam = 1 }) => {
      const data = await cryptoService.getMarkets('usd', pageParam, itemsPerPage, true);
      
      let filtered = data.filter((coin: Cryptocurrency) => {
        const matchesSearch = coin.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                            coin.symbol.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesMarketCap = coin.market_cap >= filters.minMarketCap && 
                                coin.market_cap <= filters.maxMarketCap;
        const matchesPrice = coin.current_price >= filters.minPrice && 
                            coin.current_price <= filters.maxPrice;
        
        return matchesSearch && matchesMarketCap && matchesPrice;
      });

      filtered.sort((a: Cryptocurrency, b: Cryptocurrency) => {
        let comparison = 0;
        switch (sortBy) {
          case 'market_cap':
            comparison = a.market_cap - b.market_cap;
            break;
          case 'price':
            comparison = a.current_price - b.current_price;
            break;
          case 'change_24h':
            comparison = a.price_change_percentage_24h - b.price_change_percentage_24h;
            break;
          case 'volume':
            comparison = a.total_volume - b.total_volume;
            break;
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });

      return {
        data: filtered,
        nextPage: pageParam + 1,
        hasMore: data.length === itemsPerPage,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
      staleTime: 30000, 
      cacheTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
    }
  );
};

export const useCryptoDetail = (id: string) => {
  return useQuery(
    ['cryptoDetail', id],
    () => cryptoService.getCoinDetail(id),
    {
      enabled: !!id,
      staleTime: 60000,
      cacheTime: 10 * 60 * 1000,
    }
  );
};

export const useMarketChart = (id: string, days: number = 7) => {
  return useQuery(
    ['marketChart', id, days],
    () => cryptoService.getMarketChart(id, days),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000, 
      cacheTime: 15 * 60 * 1000, 
    }
  );
};