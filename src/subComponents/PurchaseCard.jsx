import React from "react";
import "../css/purchaseCard.css";

const PurchaseCard = ({ order, onViewDetails }) => {
  return (
    <div className="purchase-card">
      <div className="purchase-info">
        <span><strong>Pedido:</strong> {order.id}</span>
        <span><strong>Fecha:</strong> {order.date}</span>
        <span><strong>Estado:</strong> {order.status}</span>
      </div>

      <div className="purchase-actions">
        <span><strong>Total:</strong> ${order.total}</span>
        <span className="view-details" onClick={() => onViewDetails(order)}>
          Ver detalles →
        </span>
      </div>
    </div>
  );
};

export default PurchaseCard;

