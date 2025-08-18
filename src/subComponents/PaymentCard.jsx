import React, { useState, useEffect } from 'react';
import '../css/paymentCard.css';
import visaLogo from '../assets/Visa_Logo.png'; // íconos que tengas
import mastercardLogo from '../assets/Mastercard-Logo.wine.webp';
import amexLogo from '../assets/amex.webp';

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

const PaymentCard = ({ cardNumber, cardHolder, expiry, ccv, isFlipped }) => {
  const [cardType, setCardType] = useState('default');

  useEffect(() => {
    setCardType(detectCardType(cardNumber));
  }, [cardNumber]);

  const style = cardStyles[cardType] || cardStyles.default;

  // Formatear número en grupos de 4
  const formattedNumber = cardNumber
    ? cardNumber.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
    : '#### #### #### ####';

  return (
    <div className={`payment-card ${isFlipped ? 'flipped' : ''}`} style={{ background: style.background, color: style.color }}>
      <div className="front">
        {style.logo && <img src={style.logo} alt={`${cardType} logo`} className="card-logo" />}
        <div className="card-number">{formattedNumber || '#### #### #### ####'}</div>
        <div className="card-holder-expiry">
          <div>
            <label>TITULAR</label>
            <div>{cardHolder || 'NOMBRE APELLIDO'}</div>
          </div>
          <div>
            <label>VENCE</label>
            <div>{expiry || 'MM/AA'}</div>
          </div>
        </div>
      </div>

      <div className="back">
        <div className="magnetic-strip" />
        <div className="signature-strip">
          <div className="ccv">{ccv || '•••'}</div>
        </div>
        {style.logo && <img src={style.logo} alt={`${cardType} logo`} className="card-logo-back" />}
      </div>
    </div>
  );
};

export default PaymentCard;