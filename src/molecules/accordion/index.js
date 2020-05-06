import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, Accordion, useAccordionToggle } from 'react-bootstrap';
import CkeckboxInput from '../../atoms/checkbox';

const Header = styled(Card.Header)`
  padding: 0;
  border: 0;
  display: flex;
  background: #f0f0f5;
  align-items: center;
  & > p {
    font: 400 16px Roboto, sans-serif;
    margin: 0;
  }
`;
const StyledCard = styled(Card)`
  border: 0;
  box-shadow: 0;
  margin: 8px 0;
`;

const Body = styled(Card.Body)`
  border: 1px solid #dcdce6;
  border-radius: 4px;
`;

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey);
  useEffect(() => {
    decoratedOnClick();
  }, [children.props.checked]);

  return { ...children };
}

function Toggle({ content, checked, onClick, text }) {
  return (
    <Accordion defaultActiveKey="0">
      <StyledCard>
        <Header>
          <CustomToggle eventKey="0">
            <CkeckboxInput checked={checked} onClick={onClick} />
          </CustomToggle>
          <p>{text}</p>
        </Header>
        <Accordion.Collapse eventKey="0">
          <Body>{content}</Body>
        </Accordion.Collapse>
      </StyledCard>
    </Accordion>
  );
}
export default Toggle;
