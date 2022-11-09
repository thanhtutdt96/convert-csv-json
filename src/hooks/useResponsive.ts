import { useMediaQuery, useTheme } from '@mui/material';

const useResponsive = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktopScreen = useMediaQuery(theme.breakpoints.up('md'));

  return {
    isMobileScreen,
    isDesktopScreen,
  };
};

export default useResponsive;
