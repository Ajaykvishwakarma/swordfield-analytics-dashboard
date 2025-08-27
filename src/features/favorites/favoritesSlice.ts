import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
interface FavoritesState {
  items: string[]; 
}

const loadFavoritesFromStorage = (): string[] => {
  try {
    const saved = localStorage.getItem('cryptoFavorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (favorites: string[]) => {
  localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.items.indexOf(action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveFavoritesToStorage(state.items);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(id => id !== action.payload);
      saveFavoritesToStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;