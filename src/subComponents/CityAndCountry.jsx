import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

const CityAndCountry = ({ formData, setFormData }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!formData.country) {
      setCities([]);
      setFormData({ ...formData, city: '' });
      return;
    }

    const selectedCountry = countries.find(p => p.country === formData.country);
    if (selectedCountry) {
      setCities(selectedCountry.cities);
      setFormData({ ...formData, city: '' });
    }
  }, [formData.country, countries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Form.Group controlId='country'  className='mt-3'>
        <Form.Label>País</Form.Label>
        <Form.Select
          name='country'
          value={formData.country || ''}
          onChange={handleChange}
          required
        >
          <option value=''>Seleccione un país</option>
          {countries.map((c) => (
            <option key={c.country} value={c.country}>
              {c.country}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId='city' className='mt-3'>
        <Form.Label>Ciudad</Form.Label>
        <Form.Select
          name='city'
          value={formData.city || ''}
          onChange={handleChange}
          disabled={!formData.country}
          required
        >
          <option value=''>Seleccione una ciudad</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default CityAndCountry;
