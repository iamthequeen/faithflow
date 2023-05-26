import { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
import LinearProgressWithLabel from '../LinearProgressWithLabel/LinearProgressWithLabel';

function LoadingScreen() {

    const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '80%', margin: "auto", }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default LoadingScreen;