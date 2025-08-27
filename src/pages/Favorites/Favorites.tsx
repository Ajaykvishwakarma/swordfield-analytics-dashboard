import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Alert,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearFavorites } from '../../features/favorites/favoritesSlice';
import { cryptoService } from '../../services/cryptoService';
import { CryptoCard } from '../../components/dashboard/CryptoCard';
import { CryptoList } from '../../components/dashboard/CryptoList';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { useMediaQuery, useTheme } from '@mui/material';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isListView = useMediaQuery(theme.breakpoints.up('lg'));
  const favorites = useAppSelector(state => state.favorites.items);

  const { data: allCryptos, isLoading } = useQuery({
    queryKey: ['favorites', favorites],
    queryFn: () => cryptoService.getMarkets('usd', 1, 250, true),
    enabled: favorites.length > 0,
  });

  const favoriteCryptos = allCryptos?.filter(crypto =>
    favorites.includes(crypto.id)
  ) || [];

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  if (favorites.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Favorites
        </Typography>
        <Alert severity="info">
          You haven't added any cryptocurrencies to your favorites yet.
          <Box mt={2}>
            <Button variant="contained" onClick={() => navigate('/dashboard')}>
              Browse Cryptocurrencies
            </Button>
          </Box>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            My Favorites
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your favorite cryptocurrencies
          </Typography>
        </Box>
        <Button
          startIcon={<DeleteIcon />}
          onClick={handleClearAll}
          color="error"
          variant="outlined"
        >
          Clear All
        </Button>
      </Box>

      {isLoading ? (
        <SkeletonLoader count={favorites.length} type={isListView ? 'list' : 'card'} />
      ) : (
        <>
          {isListView ? (
            <CryptoList cryptos={favoriteCryptos} />
          ) : (
            <Grid container spacing={3}>
              {favoriteCryptos.map(crypto => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={crypto.id}>
                  <CryptoCard crypto={crypto} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default Favorites;