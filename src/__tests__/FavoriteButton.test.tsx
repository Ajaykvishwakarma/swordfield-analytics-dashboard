import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { FavoriteButton } from '../components/favorites/FavoriteButton';
import favoritesReducer from '../features/favorites/favoritesSlice';

const createTestStore = (initialFavorites: string[] = []) =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: {
        items: initialFavorites,
      },
    },
  });

describe('FavoriteButton Component', () => {
  test('renders unfavorited state correctly', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <FavoriteButton cryptoId="bitcoin" />
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  test('renders favorited state correctly', () => {
    const store = createTestStore(['bitcoin']);
    
    render(
      <Provider store={store}>
        <FavoriteButton cryptoId="bitcoin" />
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiIconButton-colorError');
  });

  test('toggles favorite on click', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <FavoriteButton cryptoId="bitcoin" />
      </Provider>
    );

    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(store.getState().favorites.items).toContain('bitcoin');
    
    fireEvent.click(button);
    expect(store.getState().favorites.items).not.toContain('bitcoin');
  });

  test('persists favorites to localStorage', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <FavoriteButton cryptoId="ethereum" />
      </Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const savedFavorites = JSON.parse(localStorage.getItem('cryptoFavorites') || '[]');
    expect(savedFavorites).toContain('ethereum');
  });
});