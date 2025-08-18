import React, { useState } from "react";
import Header from "../components/Header";
import '../css/contact.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    asunto: "",
    consulta: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email ingresado no es válido.";
    }
    if (!formData.consulta.trim()) newErrors.consulta = "La consulta es obligatoria.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Aquí iría la lógica de envío al backend
      // Ejemplo de objeto para enviar:
      const payload = { ...formData };
      console.log("Enviar payload:", payload);

      setSubmitted(true);
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        asunto: "",
        consulta: "",
      });
      setErrors({});
    } else {
      setSubmitted(false);
    }
  };

  return (
    <>
      <Header />
      <div className="contact">
        <div className="contact__container-title">
          <h3 className="contact__title">Contacto</h3>
        </div>
        <form onSubmit={handleSubmit} className="contact__container-form">
          <div className="form-group">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="nombre">Nombre</label>
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="apellido">Apellido</label>
            {errors.apellido && <span className="error">{errors.apellido}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="email">Correo electrónico</label>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="telefono">Teléfono</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="asunto">Asunto</label>
          </div>

          <div className="form-group">
            <textarea
              id="consulta"
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
              placeholder=" "
              rows={4}
            />
            <label htmlFor="consulta">Consulta</label>
            {errors.consulta && <span className="error">{errors.consulta}</span>}
          </div>

          <div className="contact__container-btn">
            <button type="submit" className="contact-btn">
              Enviar
            </button>
          </div>

          {submitted && <p className="success-message">¡Formulario enviado correctamente!</p>}
        </form>
      </div>
    </>
  );
};

export default ContactForm;

