import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import visaLogo from '../assets/Visa_Logo.png';
import mastercardLogo from '../assets/Mastercard-Logo.wine.webp';
import amexLogo from '../assets/amex.webp';
import '../css/paymentManager.css';

const cardStyles = {
  visa: {
    background: 'linear-gradient(135deg, #1a237e, #3949ab)',
    color: 'white',
    logo: visaLogo,
  },
  mastercard: {
    background: 'linear-gradient(135deg, #f44336, #d32f2f)',
    color: 'white',
    logo: mastercardLogo,
  },
  amex: {
    background: 'linear-gradient(135deg, #0077c2, #005ea2)',
    color: 'white',
    logo: amexLogo,
  },
  default: {
    background: 'linear-gradient(135deg, #455a64, #607d8b)',
    color: 'white',
    logo: null,
  },
};

function detectCardType(number) {
  const cleaned = number.replace(/\D/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  return 'default';
}

const formatCardNumber = (number) => {
  const cleaned = number.replace(/\D/g, '');
  let formatted = '';
  for (let i = 0; i < cleaned.length && i < 16; i++) {
    if (i !== 0 && i % 4 === 0) formatted += ' ';
    formatted += cleaned[i];
  }
  return formatted;
};

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    ccv: '',
  });
  const [cardType, setCardType] = useState('default');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCcv, setShowCcv] = useState(false);
  const ccvTimeoutRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user?.payments) {
      setPayments(user.payments);
    }
  }, []);

  useEffect(() => {
    setCardType(detectCardType(formData.cardNumber));
  }, [formData.cardNumber]);

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setFormData(payments[index]);
      setEditingIndex(index);
    } else {
      setFormData({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        ccv: '',
      });
      setEditingIndex(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      ccv: '',
    });
    setIsFlipped(false);
    setShowCcv(false);
    if (ccvTimeoutRef.current) {
      clearTimeout(ccvTimeoutRef.current);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'ccv') {
      // Cuando empieza a escribir CCV mostramos claro por 3 segundos
      setShowCcv(true);
      if (ccvTimeoutRef.current) clearTimeout(ccvTimeoutRef.current);
      ccvTimeoutRef.current = setTimeout(() => setShowCcv(false), 3000);
    }

    // Limitar inputs: solo números para cardNumber y ccv, letras y espacios para cardHolder, MM/AA para expiry
    if (name === 'cardNumber') {
      // Permitir solo números hasta 16 dígitos
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else if (name === 'ccv') {
      // Solo números hasta 4 (Amex tiene 4)
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else if (name === 'expiry') {
      // Formato MM/AA (sin validar fecha aún)
      let val = value;
      if (val.length === 2 && !val.includes('/')) {
        val = val + '/';
      }
      setFormData(prev => ({ ...prev, [name]: val.slice(0, 5) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFocus = (e) => {
    if (e.target.name === 'ccv') {
      setIsFlipped(true);
      setShowCcv(true);
      if (ccvTimeoutRef.current) clearTimeout(ccvTimeoutRef.current);
      ccvTimeoutRef.current = setTimeout(() => setShowCcv(false), 3000);
    } else {
      setIsFlipped(false);
      if (ccvTimeoutRef.current) {
        clearTimeout(ccvTimeoutRef.current);
        setShowCcv(false);
      }
    }
  };

  const handleSave = () => {
    // Validaciones simples
    if (
    formData.cardNumber.length < 13 ||
    formData.cardHolder.trim() === '' ||
    formData.expiry.length !== 5 ||
    formData.ccv.length < 3
  ) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  const updatedPayments = [...payments];
  if (editingIndex !== null) {
    updatedPayments[editingIndex] = formData;
  } else {
    updatedPayments.push(formData);
  }
  setPayments(updatedPayments);

  // Actualizar sólo la parte de payments del currentUser
  const user = JSON.parse(localStorage.getItem('currentUser')) || {};
  const updatedUser = { ...user, payments: updatedPayments };
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  handleCloseModal();
  };

  const handleDelete = (index) => {
    const updatedPayments = payments.filter((_, i) => i !== index);
    setPayments(updatedPayments);

    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const updatedUser = { ...user, payments: updatedPayments };
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const style = cardStyles[cardType] || cardStyles.default;

  return (
    <div>
      <ul className="list-container">
        {payments.map((payment, index) => (
          <li key={index} className="list-item">
            <div className="item-header">
              {cardType.toUpperCase() === 'DEFAULT'
                ? 'Tarjeta'
                : cardType.charAt(0).toUpperCase() + cardType.slice(1)}{' '}
              **** **** **** {payment.cardNumber.slice(-4)}
            </div>
            <div className="item-details">Titular: {payment.cardHolder}</div>
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
        Agregar nuevo medio de pago
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header style={{ backgroundColor: '#0081ea' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>
            {editingIndex !== null ? 'Editar medio de pago' : 'Nuevo medio de pago'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="payment-card" style={{ background: style.background, color: style.color, perspective: '1500px' }}>
            <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
              <div className="card-front">
                {style.logo && <img src={style.logo} alt={`${cardType} logo`} className="card-logo" />}
                <div className="card-number">{formatCardNumber(formData.cardNumber) || '#### #### #### ####'}</div>
                <div className="card-holder-expiry">
                  <div>
                    <label>TITULAR</label>
                    <div>{formData.cardHolder || 'NOMBRE APELLIDO'}</div>
                  </div>
                  <div>
                    <label>VENCE</label>
                    <div>{formData.expiry || 'MM/AA'}</div>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <div className="magnetic-strip" />
                <div className="signature-strip">
                  <div className="ccv">{showCcv ? formData.ccv || '•••' : '•••'}</div>
                </div>
                {style.logo && <img src={style.logo} alt={`${cardType} logo`} className="card-logo-back" />}
              </div>
            </div>
          </div>

          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Número de tarjeta</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                autoComplete="off"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Titular</Form.Label>
              <Form.Control
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                placeholder="Nombre completo"
                autoComplete="off"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Vencimiento (MM/AA)</Form.Label>
              <Form.Control
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="MM/AA"
                maxLength="5"
                autoComplete="off"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>CCV</Form.Label>
              <Form.Control
                type={showCcv ? 'text' : 'password'}
                name="ccv"
                value={formData.ccv}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="123"
                maxLength="4"
                autoComplete="off"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentManager;