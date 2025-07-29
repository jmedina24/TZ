import React from 'react';
import { Form } from 'react-bootstrap';
import CityAndCountry from './CityAndCountry'; // Reutilizamos tu componente

const AddressCardForm = ({ address, index, onChange, onDelete }) => {
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange(index, { ...address, [name]: value });
  };

  const handleCityCountryChange = (updatedData) => {
    onChange(index, { ...address, ...updatedData });
  };

  return (
    <div className="list-item">
      <Form.Group className="mb-2">
        <Form.Label>Concepto</Form.Label>
        <Form.Control
          type="text"
          name="concept"
          value={address.concept}
          onChange={handleFieldChange}
          placeholder="Casa, Trabajo, etc."
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Calle</Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={address.street}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Número</Form.Label>
        <Form.Control
          type="text"
          name="number"
          value={address.number}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Código Postal</Form.Label>
        <Form.Control
          type="text"
          name="postalCode"
          value={address.postalCode}
          onChange={handleFieldChange}
        />
      </Form.Group>

      {/* País y ciudad con tu componente */}
      <CityAndCountry
        formData={address}
        setFormData={(newData) => handleCityCountryChange(newData)}
      />

      <div className="item-actions mt-3">
        <button className="delete-btn" onClick={() => onDelete(index)}>
          <i className="bi bi-trash" /> Eliminar dirección
        </button>
      </div>
    </div>
  );
};

export default AddressCardForm;
