import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LoginWarning = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header style={{backgroundColor: '#0081EA'}} closeButton>
        <Modal.Title style={{color: 'white'}}>Atención</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Debe iniciar sesión para realizar esta acción.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginWarning;
