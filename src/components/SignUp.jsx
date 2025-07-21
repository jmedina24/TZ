import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

const SignUp = ({ show, handleClose, handleRegister, users }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validación contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden...');
      return;
    }

    // Validar si email ya existe en users
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (emailExists) {
      setError('Ya existe una cuenta asociada a ese correo electrónico.');
      return;
    }

    setError('');
    handleRegister({ email: formData.email, password: formData.password });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{backgroundColor: '#0081EA'}} closeButton>
        <Modal.Title style={{color: 'white'}}>Crear cuenta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              required
            />
          </Form.Group>

          {error && (
            <div className="mt-2 text-danger" style={{ fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="mt-4 w-100"
            style={{ backgroundColor: '#0081EA', borderColor: '#0081EA' }}
          >
            Continuar registro
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp