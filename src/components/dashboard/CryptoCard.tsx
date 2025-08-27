import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Chip,
  IconButton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { Cryptocurrency } from '../../features/crypto/types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { FavoriteButton } from '../favorites/FavoriteButton';

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const navigate = useNavigate();
  const isPositive = crypto.price_change_percentage_24h >= 0;

  const handleClick = () => {
    navigate(`/crypto/${crypto.id}`);
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer', 
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={crypto.image} alt={crypto.name}>
              {crypto.symbol.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6" component="div">
                {crypto.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {crypto.symbol.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Box onClick={(e) => e.stopPropagation()}>
            <FavoriteButton cryptoId={crypto.id} />
          </Box>
        </Box>

        <Box mt={3}>
          <Typography variant="h5" component="div" gutterBottom>
            {formatCurrency(crypto.current_price)}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            {isPositive ? (
              <TrendingUpIcon color="success" fontSize="small" />
            ) : (
              <TrendingDownIcon color="error" fontSize="small" />
            )}
            <Chip
              label={formatPercentage(crypto.price_change_percentage_24h)}
              color={isPositive ? 'success' : 'error'}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="caption" color="text.secondary">
              Market Cap
            </Typography>
            <Typography variant="body2">
              {formatCurrency(crypto.market_cap, 0)}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary">
              Volume (24h)
            </Typography>
            <Typography variant="body2">
              {formatCurrency(crypto.total_volume, 0)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};