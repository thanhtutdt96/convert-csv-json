import { Route, Routes } from 'react-router';
import Home from 'pages/Home';
import styled from 'styled-components';

const MainWrapper = styled.div`
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

function App() {
  return (
    <MainWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MainWrapper>
  );
}

export default App;
