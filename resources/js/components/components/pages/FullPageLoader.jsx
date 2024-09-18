import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const FullPageLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '7.4%',
        left: 0,
        width: '100%',
        height: '93%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
        backdropFilter: 'blur(5px)', // Blurs the background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300, // Ensures it appears on top of other content
      }}
    >
      <CircularProgress size={60} />
      
    </Box>
  );
};

export default FullPageLoader;