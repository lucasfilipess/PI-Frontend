import React from 'react';
import styled from 'styled-components';
import RegisterCard from '../../organisms/resgisterCard';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function RegisterTemplate() {
  return (
    <Container>
      <RegisterCard />
    </Container>
  );
}
export default RegisterTemplate;