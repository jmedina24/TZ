import React from "react";
import "../css/purchaseModal.css";

const PurchaseModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal-content">
        <h3 className="purchase-modal-title">Detalle del pedido: {order.id}</h3>
        <p>
          <strong>Fecha:</strong> {order.date}
        </p>
        <p>
          <strong>Estado:</strong> {order.status}
        </p>
        <p>
          <strong>Medio de pago:</strong> {order.paymentMethod}
        </p>

        <h4>Productos:</h4>
        <ul>
          {order.products.map((p, idx) => (
            <li key={idx}>
              <span>
                {p.name} x{p.quantity}
              </span>
              <span>${p.price * p.quantity}</span>
            </li>
          ))}
        </ul>

        <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer">
          Descargar factura
        </a>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PurchaseModal;
