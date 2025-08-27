import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';

interface FavoriteButtonProps {
  cryptoId: string;
  size?: 'small' | 'medium' | 'large';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  cryptoId, 
  size = 'medium' 
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const isFavorite = favorites.includes(cryptoId);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(cryptoId));
  };

  return (
    <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton
        onClick={handleToggle}
        color={isFavorite ? 'error' : 'default'}
        size={size}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};