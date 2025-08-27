import React from 'react';
import { Skeleton, Box, Card, CardContent } from '@mui/material';

interface SkeletonLoaderProps {
  count?: number;
  type?: 'card' | 'list' | 'detail';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  count = 1, 
  type = 'card' 
}) => {
  const renderCardSkeleton = () => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box flex={1}>
            <Skeleton width="60%" height={24} />
            <Skeleton width="40%" height={20} />
          </Box>
        </Box>
        <Skeleton width="100%" height={60} />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Skeleton width="30%" height={20} />
          <Skeleton width="30%" height={20} />
          <Skeleton width="30%" height={20} />
        </Box>
      </CardContent>
    </Card>
  );

  const renderListSkeleton = () => (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Box display="flex" alignItems="center">
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box flex={1}>
          <Skeleton width="40%" height={24} />
          <Skeleton width="20%" height={20} />
        </Box>
        <Box textAlign="right">
          <Skeleton width={100} height={24} />
          <Skeleton width={80} height={20} />
        </Box>
      </Box>
    </Box>
  );

  const renderDetailSkeleton = () => (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Skeleton variant="circular" width={80} height={80} sx={{ mr: 3 }} />
        <Box flex={1}>
          <Skeleton width="50%" height={40} />
          <Skeleton width="30%" height={24} />
        </Box>
      </Box>
      <Skeleton width="100%" height={300} sx={{ mb: 4 }} />
      <Skeleton width="100%" height={100} />
    </Box>
  );

  const skeletons = Array.from({ length: count }, (_, index) => (
    <Box key={index} sx={{ mb: type === 'card' ? 2 : 0 }}>
      {type === 'card' && renderCardSkeleton()}
      {type === 'list' && renderListSkeleton()}
      {type === 'detail' && renderDetailSkeleton()}
    </Box>
  ));

  return <>{skeletons}</>;
};