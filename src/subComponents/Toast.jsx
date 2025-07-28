import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "info", duration = 2500, onClose }) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible || !message) return null;

  // Definir colores o estilos según el tipo de mensaje
  const backgroundColors = {
    info: "#0081ea",
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
  };

  const bgColor = backgroundColors[type] || backgroundColors.info;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: bgColor,
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        zIndex: 9999,
        animation: "fadeInOut 2.5s ease-in-out forwards",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
