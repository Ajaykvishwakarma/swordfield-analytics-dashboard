import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  Chip,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useCryptoDetail } from '../../hooks/useCryptoData';
import { PriceChart } from '../../components/detail/PriceChart';
import { MarketStats } from '../../components/detail/MarketStats';
import { FavoriteButton } from '../../components/favorites/FavoriteButton';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { formatCurrency } from '../../utils/formatters';

const CryptoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useCryptoDetail(id || '');

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <SkeletonLoader type="detail" />
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          {error?.message || 'Failed to load cryptocurrency details'}
        </Alert>
        <Box mt={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/dashboard')}
          sx={{ cursor: 'pointer' }}
        >
          Dashboard
        </Link>
        <Typography color="text.primary">{data.name}</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={data.image.large}
              alt={data.name}
              sx={{ width: 64, height: 64 }}
            >
              {data.symbol.toUpperCase()}
            </Avatar>
            <Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h4" component="h1">
                  {data.name}
                </Typography>
                <Chip label={data.symbol.toUpperCase()} size="small" />
              </Box>
              <Typography variant="h5" color="primary" mt={1}>
                {formatCurrency(data.market_data.current_price.usd)}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <FavoriteButton cryptoId={data.id} size="large" />
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/dashboard')}
              variant="outlined"
            >
              Back
            </Button>
          </Box>
        </Box>

        {data.description.en && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              About {data.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxHeight: 200,
                overflow: 'auto',
                pr: 2,
              }}
              dangerouslySetInnerHTML={{
                __html: data.description.en.split('. ').slice(0, 3).join('. ') + '.',
              }}
            />
          </Box>
        )}

        {data.categories && data.categories.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap">
            {data.categories.map((category) => (
              <Chip key={category} label={category} size="small" variant="outlined" />
            ))}
          </Box>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <PriceChart cryptoId={data.id} name={data.name} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <MarketStats data={data} />
        </Grid>

        {data.links && (
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Links & Resources
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                {data.links.homepage[0] && (
                  <Button
                    startIcon={<OpenInNewIcon />}
                    href={data.links.homepage[0]}
                    target="_blank"
                    variant="outlined"
                    size="small"
                  >
                    Website
                  </Button>
                )}
                {data.links.subreddit_url && (
                  <Button
                    startIcon={<OpenInNewIcon />}
                    href={data.links.subreddit_url}
                    target="_blank"
                    variant="outlined"
                    size="small"
                  >
                    Reddit
                  </Button>
                )}
                {data.links.twitter_screen_name && (
                  <Button
                    startIcon={<OpenInNewIcon />}
                    href={`https://twitter.com/${data.links.twitter_screen_name}`}
                    target="_blank"
                    variant="outlined"
                    size="small"
                  >
                    Twitter
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};


export default CryptoDetailPage;