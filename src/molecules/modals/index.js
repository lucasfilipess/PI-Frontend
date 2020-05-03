import React from 'react';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { FiXOctagon, FiCheckCircle } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    display: 'flex',
    height: 200,
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 2),
    width: 500,
  },
}));

const Octagon = styled(FiXOctagon)`
  color: #f44336;
  min-height: 70px;
  margin-right: 20px;
  min-width: 70px;
`;

const CheckCircle = styled(FiCheckCircle)`
  color: #4caf50;
  min-height: 70px;
  margin-right: 20px;
  min-width: 70px;
`;

export default function SuccesModal({ text, close, open, fadein }) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={close}
        open={open}
      >
        <Fade in={fadein}>
          <div className={classes.paper}>
            <CheckCircle />
            <h2 id="transition-modal-title">{text}</h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export function ErrorModal({ text, close, open, fadein }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={close}
        open={open}
      >
        <Fade in={fadein}>
          <div className={classes.paper}>
            <Octagon />
            <h2 id="transition-modal-title">{text}</h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
