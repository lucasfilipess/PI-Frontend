import React from 'react';
import styled from 'styled-components';
import LoginCard from '../../organisms/loginCard';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function LoginTemplate() {
  return (
    <Container>
      <LoginCard />
    </Container>
  );
}
export default LoginTemplate;