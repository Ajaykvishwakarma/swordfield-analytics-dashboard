import { api } from './api';
import type { Cryptocurrency, CryptoDetailData, PriceChartData } from "../features/crypto/types";

export const cryptoService = {
  getMarkets: async (
    vs_currency = 'usd',
    page = 1,
    per_page = 100,
    sparkline = true
  ): Promise<Cryptocurrency[]> => {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency,
        order: 'market_cap_desc',
        per_page,
        page,
        sparkline,
        price_change_percentage: '24h,7d,30d',
      },
    });
    return response.data;
  },

  getCoinDetail: async (id: string): Promise<CryptoDetailData> => {
    const response = await api.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: true,
        developer_data: false,
        sparkline: true,
      },
    });
    return response.data;
  },

  getMarketChart: async (
    id: string,
    days: number = 7,
    interval: string = 'daily'
  ): Promise<PriceChartData> => {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
        interval,
      },
    });
    return response.data;
  },

  searchCoins: async (query: string): Promise<any> => {
    const response = await api.get('/search', {
      params: { query },
    });
    return response.data;
  },

  getTrending: async (): Promise<any> => {
    const response = await api.get('/search/trending');
    return response.data;
  },
};