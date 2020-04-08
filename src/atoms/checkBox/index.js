// import React, { useState } from 'react';
// import Checkbox from '@material-ui/core/Checkbox';
// import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);




// function CheckBox() {

//   const [checked, setChecked] = useState('');

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };


//   return (
//     <div>
//       <GreenCheckbox
//         onChange={() => setChecked('donor')}
//         checked={checked === 'donor' ? true : false}
//         inputProps={{ 'aria-label': 'primary GreenCheckbox' }}
//         color="green" />

//       <GreenCheckbox
//         onChange={() => setChecked('company')}
//         checked={checked === 'company' ? true : false}
//         inputProps={{ 'aria-label': 'primary checkbox' }} />
//     </div>
//   );
// }
// export default CheckBox;




import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);




function CheckBox() {

  const [state, setState] = useState('');

  console.log(state);


  return (
    <div>
      <GreenCheckbox
        onChange={() => setState('donor')}
        checked={state === 'donor' ? true : false}
        required="required"
      // inputProps={{ 'aria-label': 'primary GreenCheckbox' }}
      />

      <GreenCheckbox
        onChange={() => setState('company')}
        checked={state === 'company' ? true : false}
        required="required"
      // inputProps={{ 'aria-label': 'primary checkbox' }} 
      />
    </div>
  );
}
export default CheckBox;


