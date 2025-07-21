import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import CityAndCountry from '../subComponents/CityAndCountry';

const PersonalData = ({show, handleClose, handleRegister}) => {
    const [formData, setFormData] = useState({
        documento: '',
        firstName:'',
        middleName: '',
        firstSurname: '',
        secondSurname: '',
        birthDate: '',
        phone: '',
        address: '',
        country: '',
        city: '',
    });

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value});

   

    const allowUser = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        const age = today.getFullYear() - birth.getFullYear();
        const month = today.getMonth() - birth.getMonth();

        return(
            age > 18 || (age === 18 && month >= 0 && today.getDate() >= birth.getDate())
        )
    }

     const onSubmit = (e) => {
        e.preventDefault();

        if(!allowUser(formData.birthDate)){
            alert('El usuario debe de tener al menos 18 años para poder registrarse.');
            return;
        }

        handleRegister(formData);
    };

  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{backgroundColor: '#0081EA'}} closeButton>
            <Modal.Title style={{color: 'white'}}>Datos personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId='documento' className='mt-3'>
                    <Form.Label>Documento / DNI</Form.Label>
                    <Form.Control name='documento' value={formData.documento} onChange={onChange} required />
                </Form.Group>

                <Form.Group controlId='firstName' className='mt-3'>
                    <Form.Label>Primer nombre</Form.Label>
                    <Form.Control name='firstName' value={formData.firstName} onChange={onChange} required />
                </Form.Group>

                <Form.Group controlId='middleName' className='mt-3'>
                    <Form.Label>Segundo nombre</Form.Label>
                    <Form.Control name='middleName' value={formData.middleName} onChange={onChange} />
                </Form.Group>

                <Form.Group controlId='firstSurname' className='mt-3'>
                    <Form.Label>Primer apellido</Form.Label>
                    <Form.Control name='firstSurname' value={formData.firstSurname} onChange={onChange} required />
                </Form.Group>

                <Form.Group controlId='secondSurname' className='mt-3'>
                    <Form.Label>Segundo apellido</Form.Label>
                    <Form.Control name='secondSurname' value={formData.secondSurname} onChange={onChange} required />
                </Form.Group>

                <Form.Group controlId='birthDate' className='mt-3'>
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control type='date' name='birthDate' value={formData.birthDate} onChange={onChange} max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]} required />
                </Form.Group>

                <Form.Group controlId='phone' className='mt-3'>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type='tel' name='phone' value={formData.phone} onChange={onChange} required />
                </Form.Group>

                <Form.Group controlId='address' className='mt-3'>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type='text' name='address' value={formData.address} onChange={onChange} required />
                </Form.Group>

                <CityAndCountry formData={formData} setFormData={setFormData} required/>

                <div className='mt-5 text-end'>
                    <Button variant='secondary' onClick={handleClose} className='me-2'>
                        Cancelar
                    </Button>
                    <Button type='submit' variant='primary'>
                        Finalizar registro
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default PersonalData