import { Alert, Container, Typography } from '@mui/material';
import logo from 'assets/logo.png';
import Converter from 'components/Converter';
import { useAppSelector } from 'hooks/useRedux';
import useResponsive from 'hooks/useResponsive';
import styled from 'styled-components';
import { ToastType } from 'types/Common';

const WrapperStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContainerStyled = styled(Container)`
  margin-bottom: 1.5rem;
  max-width: 800px !important;
`;

const Home = () => {
  const { isMobileScreen } = useResponsive();
  const { isToastVisible, toastMessage, toastType } = useAppSelector((state) => state.toast);

  return (
    <>
      <Typography
        variant={isMobileScreen ? 'h5' : 'h4'}
        fontWeight={700}
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom="1rem"
      >
        <img
          src={logo}
          alt="logo"
          width={isMobileScreen ? '25px' : '32px'}
          style={{ marginRight: '0.5rem' }}
        />
        Data Converter
      </Typography>
      {!isMobileScreen && (
        <ContainerStyled style={{ visibility: isToastVisible ? 'visible' : 'hidden' }}>
          <Alert severity={toastType === ToastType.SUCCESS ? 'success' : 'error'}>
            {toastMessage}
          </Alert>
        </ContainerStyled>
      )}
      <WrapperStyled>
        <Converter />
      </WrapperStyled>
    </>
  );
};

export default Home;
