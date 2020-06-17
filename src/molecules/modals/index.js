import React from 'react';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { FiXOctagon, FiCheckCircle } from 'react-icons/fi';
import { AiFillAlert } from 'react-icons/ai';
import Button from '../../atoms/button';

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

const Alert = styled(AiFillAlert)`
  color: #f44336;
  min-height: 70px;
  min-width: 70px;
`;

const CheckCircle = styled(FiCheckCircle)`
  color: #4caf50;
  min-height: 70px;
  margin-right: 20px;
  min-width: 70px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  & > h2 {
    margin: auto 0;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 10px;
    & > Button {
      width: 180px;
      border: 1px solid #4caf50;
      color: #fff;
      transition: color 0.2s, background 0.2s;
    }
    & > Button + Button {
      border: 1px solid #d32f2f;
      background: #d32f2f;
      margin-left: 30px;
    }
  }
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

export function OptionsModal({
  text,
  close,
  open,
  fadein,
  onClick1,
  btn1,
  onClick2,
  btn2,
}) {
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
          <div
            className={classes.paper}
            style={{
              height: '300px',
              width: '600px',
              alignItems: 'flex-start',
            }}
          >
            <Container>
              <Alert />
              <h2 id="transition-modal-title">{text}</h2>
              <div>
                <Button onClick={onClick1} name={btn1} />
                <Button onClick={onClick2} name={btn2} />
              </div>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
