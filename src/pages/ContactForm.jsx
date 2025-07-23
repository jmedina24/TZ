import React, { useState } from 'react'
import Header from '../components/Header';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nombre:'',
        email: '',
        telefono: '',
        asunto: '',
        consulta: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio...';
        if (!formData.email.trim()){
            newErrors.email = 'El Email es obligatorio...';
        }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El Email ingresado no es válido...';
        }
        if (!formData.consulta.trim()) newErrors.consulta = 'La consulta es obligatoria...';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validate();
        setErrors(formErrors);
        if(Object.keys(formErrors).length === 0) {
            // Lógica de envío del form al back

            setSubmitted(true);
            setFormData({nombre: '', email: '', telefono: '', asunto: '', consulta: ''});
        }else {
            setSubmitted(false);
        }
    };

  return (
    <>
    <Header />
    
    <Container style={{ maxWidth: 600, marginTop: '2rem' }}>
      <h2 className='mb-4'>Contacto</h2>
      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          ¡Gracias por contactarnos! Te responderemos a la brevedad.
        </Alert>
      )}
      <Form onSubmit={handleSubmit} noValidate className='mt-4'>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre*</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="** Campo obligatorio **"
            value={formData.nombre}
            onChange={handleChange}
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="** Campo obligatorio **"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            placeholder="** Campo opcional **"
            value={formData.telefono}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="asunto">
          <Form.Label>Asunto</Form.Label>
          <Form.Control
            type="text"
            name="asunto"
            placeholder="** Campo obligatorio **"
            value={formData.asunto}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="consulta">
          <Form.Label>Consulta*</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="consulta"
            placeholder="** Campo obligatorio **"
            value={formData.consulta}
            onChange={handleChange}
            isInvalid={!!errors.consulta}
          />
          <Form.Control.Feedback type="invalid">{errors.consulta}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
    </>
  )
}

export default ContactForm