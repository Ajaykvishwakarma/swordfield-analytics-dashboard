import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../pages/Dashboard/Dashboard';
import cryptoReducer from '../features/crypto/cryptoSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

const createTestStore = () => configureStore({
  reducer: {
    crypto: cryptoReducer,
    favorites: favoritesReducer, 
  },
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createTestStore();
  const queryClient = createTestQueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

describe('Dashboard Component', () => {
  test('renders dashboard title', async () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    );

    expect(screen.getByText('Cryptocurrency Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Track real-time cryptocurrency prices, market caps, and trends')).toBeInTheDocument();
  });

  test('renders search bar', async () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search cryptocurrencies...');
    expect(searchInput).toBeInTheDocument();
  });

  test('search functionality works', async () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search cryptocurrencies...');
    
    fireEvent.change(searchInput, { target: { value: 'Bitcoin' } });
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('Bitcoin');
    });
  });

  test('displays loading skeleton while fetching data', () => {
    render(
      <TestWrapper>
        <Dashboard />
      </TestWrapper>
    );

    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});