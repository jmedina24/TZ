import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CityAndCountry from './CityAndCountry';
import '../css/profile.css';
import { useUser } from '../context/userContext';

const AddressManager = () => {
  const { currentUser, updateUserProfile } = useUser();
  const [addresses, setAddresses] = useState(currentUser?.addresses || []);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    concept: '',
    street: '',
    number: '',
    postalCode: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    if (currentUser?.addresses) {
      setAddresses(currentUser.addresses);
    }
  }, [currentUser]);

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setFormData(addresses[index]);
      setEditingIndex(index);
    } else {
      setFormData({
        concept: '',
        street: '',
        number: '',
        postalCode: '',
        country: '',
        city: ''
      });
      setEditingIndex(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setFormData({
      concept: '',
      street: '',
      number: '',
      postalCode: '',
      country: '',
      city: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    let updatedAddresses = [...addresses];
    if (editingIndex !== null) {
      updatedAddresses[editingIndex] = formData;
    } else {
      updatedAddresses.push(formData);
    }
    setAddresses(updatedAddresses);

    // Actualizamos en el contexto y localStorage vía updateUserProfile
    updateUserProfile({ addresses: updatedAddresses });

    handleCloseModal();
  };

  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);

    updateUserProfile({ addresses: updatedAddresses });
  };

  return (
    <div>
      <ul className="list-container">
        {addresses.map((address, index) => (
          <li key={index} className="list-item">
            <div className="item-header">{address.concept}</div>
            <div className="item-details">
              {address.street} {address.number}, {address.city}, {address.country} - CP {address.postalCode}
            </div>
            <div className="item-actions">
              <button className="edit-btn" onClick={() => handleOpenModal(index)}>
                <i className="bi bi-pencil-square"></i> Editar
              </button>
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                <i className="bi bi-trash"></i> Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Button className="add-btn" onClick={() => handleOpenModal()}>
        Agregar nueva dirección
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header style={{backgroundColor: '#0081ea'}} closeButton>
          <Modal.Title style={{color: 'white'}}>
            {editingIndex !== null ? 'Editar dirección' : 'Nueva dirección'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Concepto</Form.Label>
              <Form.Control
                type="text"
                name="concept"
                value={formData.concept}
                onChange={handleChange}
                placeholder="Casa, Trabajo, etc."
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </Form.Group>

            <CityAndCountry formData={formData} setFormData={setFormData} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressManager;

