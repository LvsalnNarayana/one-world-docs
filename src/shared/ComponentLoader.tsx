// MUI
import { Box, Stack, Typography } from '@mui/material';


// Parent, Sibling, Index
import './loader.css';
export const ComponentLoader = () => {
  return (
    <Stack
      gap={2}
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        component={'img'}
        src="/images/planet-earth.png"
        width={70}
      />
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={1}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          One World
        </Typography>
        <div className="loader"></div>
      </Stack>
    </Stack>
  );
};

export default ComponentLoader;
