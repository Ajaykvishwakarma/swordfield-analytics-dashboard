import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Avatar,
  Box,
  Typography,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { Cryptocurrency } from '../../features/crypto/types';
import { formatCurrency, formatPercentage, formatNumber } from '../../utils/formatters';
import { FavoriteButton } from '../favorites/FavoriteButton';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface CryptoListProps {
  cryptos: Cryptocurrency[];
  onLoadMore?: () => void;
  lastElementRef?: (node: HTMLTableRowElement | null) => void;
}

export const CryptoList: React.FC<CryptoListProps> = ({ 
  cryptos, 
  onLoadMore,
  lastElementRef 
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRowClick = (id: string) => {
    navigate(`/crypto/${id}`);
  };

  if (isMobile) {
    return (
      <Box>
        {cryptos.map((crypto, index) => (
          <Paper
            key={crypto.id}
            ref={index === cryptos.length - 1 ? lastElementRef : null}
            sx={{ 
              p: 2, 
              mb: 2, 
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => handleRowClick(crypto.id)}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={crypto.image} sx={{ width: 32, height: 32 }}>
                  {crypto.symbol.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">{crypto.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {crypto.symbol.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
              <Box textAlign="right">
                <Typography variant="subtitle2">
                  {formatCurrency(crypto.current_price)}
                </Typography>
                <Chip
                  label={formatPercentage(crypto.price_change_percentage_24h)}
                  color={crypto.price_change_percentage_24h >= 0 ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24h %</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Volume (24h)</TableCell>
            <TableCell align="right">Circulating Supply</TableCell>
            <TableCell align="center">Last 7 Days</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptos.map((crypto, index) => (
            <TableRow
              key={crypto.id}
              ref={index === cryptos.length - 1 ? lastElementRef : null}
              sx={{ 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={() => handleRowClick(crypto.id)}
            >
              <TableCell>{crypto.market_cap_rank}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={crypto.image} sx={{ width: 24, height: 24 }}>
                    {crypto.symbol.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">{crypto.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {crypto.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right">
                {formatCurrency(crypto.current_price)}
              </TableCell>
              <TableCell align="right">
                <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0.5}>
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <TrendingUpIcon color="success" fontSize="small" />
                  ) : (
                    <TrendingDownIcon color="error" fontSize="small" />
                  )}
                  <Typography
                    variant="body2"
                    color={crypto.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main'}
                  >
                    {formatPercentage(crypto.price_change_percentage_24h)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                {formatCurrency(crypto.market_cap, 0)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(crypto.total_volume, 0)}
              </TableCell>
              <TableCell align="right">
                {formatNumber(crypto.circulating_supply)} {crypto.symbol.toUpperCase()}
              </TableCell>
              <TableCell align="center" sx={{ width: 120 }}>
                {crypto.sparkline_in_7d?.price && (
                  <Sparklines data={crypto.sparkline_in_7d.price} width={100} height={40}>
                    <SparklinesLine 
                      color={crypto.price_change_percentage_24h >= 0 ? '#4caf50' : '#f44336'} 
                      style={{ strokeWidth: 1 }}
                    />
                  </Sparklines>
                )}
              </TableCell>
              <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                <FavoriteButton cryptoId={crypto.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};