// import React, { useState } from 'react';
// import { Card, Accordion, useAccordionToggle } from 'react-bootstrap';
// import NewDonationCard from './organisms/newDonationCard';

// function CustomToggle({ children, eventKey, teste }) {
//   const decoratedOnClick = useAccordionToggle(eventKey, () =>
//     console.log('totally custom!')
//   );

//   return (
//     <button
//       type="button"
//       style={{ backgroundColor: 'pink' }}
//       onClick={decoratedOnClick}
//     >
//       {children}
//     </button>
//   );
// }

// export default function Example({ teste }) {
//   return (
//     <Accordion defaultActiveKey="0">
//       <Card>
//         <Card.Header>
//           <CustomToggle eventKey="1">Click me!</CustomToggle>
//         </Card.Header>
//         <Accordion.Collapse eventKey="1">
//           <Card.Body>{teste}</Card.Body>
//         </Accordion.Collapse>
//       </Card>
//     </Accordion>
//   );
// }
