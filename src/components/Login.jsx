import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Login = ({show, handleClose, handleLogin, openRegister, loginError}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{backgroundColor: '#0081EA'}} closeButton>
            <Modal.Title style={{color: 'white'}}>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId='formEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId='formPassword' className='mt-3'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                {loginError && <div className='text-danger mb-2'>{loginError}</div>}
                <Button variant='primary' type='submit' className='mt-4 w-100'>Ingresar</Button>

                <div className='text-center mt-3'>
                    <Link to='#' style={{fontSize: '0.9rem'}}>¿Olvidó su contraseña?</Link>
                    <br />
                    <span style={{cursor: 'pointer', color:'#0081EA', fontSize: '0.9rem'}} onClick={openRegister}>¿No tienes cuenta? Crea una</span>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default Login