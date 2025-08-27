import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { useCryptoMarketsPaginated } from '../../hooks/useCryptoData';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFilters } from '../../features/crypto/cryptoSlice';
import { CryptoCard } from '../../components/dashboard/CryptoCard';
import { CryptoList } from '../../components/dashboard/CryptoList';
import { FilterPanel } from '../../components/dashboard/FilterPanel';
import { SortingControls } from '../../components/dashboard/SortingControls';
import { SearchBar } from '../../components/common/SearchBar';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isListView = useMediaQuery(theme.breakpoints.up('lg'));
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.crypto);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData,
  } = useCryptoMarketsPaginated(currentPage, itemsPerPage);

  const handleSearchChange = (value: string) => {
    dispatch(setFilters({ searchQuery: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (event: any) => {
    const newValue = Number(event.target.value);
    setItemsPerPage(newValue);
    setCurrentPage(1); 
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const cryptos = data?.data || [];
  
  const totalCount = data?.totalCount || 1000; 
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cryptocurrency Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track real-time cryptocurrency prices, market caps, and trends
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={{ xs: 12, md: 2 }}>
            <FilterPanel />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }}>
          <Box mb={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <SearchBar
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search cryptocurrencies..."
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                  <SortingControls />
                </Box>
              </Grid>
            </Grid>
          </Box>

          {isError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error?.message || 'Failed to load cryptocurrency data'}
            </Alert>
          )}

          {isLoading && !isPreviousData ? (
            <SkeletonLoader count={itemsPerPage} type={isListView ? 'list' : 'card'} />
          ) : (
            <>
              {cryptos.length === 0 ? (
                <Alert severity="info">
                  No cryptocurrencies found matching your filters
                </Alert>
              ) : (
                <>
                  {/* Results info and items per page selector */}
                  <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Showing {startIndex}-{endIndex} of {totalCount} results
                      {isFetching && !isLoading && (
                        <CircularProgress size={16} sx={{ ml: 1 }} />
                      )}
                    </Typography>
                    
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel id="items-per-page-label">Items per page</InputLabel>
                      <Select
                        labelId="items-per-page-label"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        label="Items per page"
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box position="relative" sx={{ opacity: isPreviousData ? 0.6 : 1 }}>
                    {isListView ? (
                      <CryptoList cryptos={cryptos} />
                    ) : (
                      <Grid container spacing={3}>
                        {cryptos.map((crypto) => (
                          <Grid
                            size={{ xs: 12, sm: 6, lg: 4 }}
                            key={crypto.id}
                          >
                            <CryptoCard crypto={crypto} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>

                  {totalPages > 1 && (
                    <Box mt={4} display="flex" justifyContent="center">
                      <Stack spacing={2}>
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={handlePageChange}
                          color="primary"
                          size={isMobile ? "small" : "large"}
                          showFirstButton
                          showLastButton
                          siblingCount={isMobile ? 0 : 1}
                          boundaryCount={isMobile ? 1 : 2}
                          variant="outlined"
                          shape="rounded"
                          disabled={isFetching}
                        />
                        
                        <Typography 
                          variant="caption" 
                          color="text.secondary" 
                          align="center"
                        >
                          Page {currentPage} of {totalPages}
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;