import React, { useState, useEffect } from "react";
import "../css/profile.css";
import Header from "../components/Header";
import { useUser } from "../context/userContext";
import AddressManager from "../subComponents/AddressManager";
import PaymentManager from "../subComponents/PaymentManager";

const EditIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z" />
  </svg>
);

const ProfileAdmin = () => {
  const [tab, setTab] = useState("personal");
  const { currentUser, updateUserProfile } = useUser();
  const [userData, setUserData] = useState({
    document: "",
    firstName: "",
    middleName: "",
    lastName: "",
    secondLastName: "",
    birthDate: "",
    phone: "",
    avatar: ""
  });

  // Cargar datos actuales al montar y cuando cambie currentUser
  useEffect(() => {
    if (currentUser) {
      setUserData({
        document: currentUser.document || "",
        firstName: currentUser.firstName || "",
        middleName: currentUser.middleName || "",
        lastName: currentUser.lastName || "",
        secondLastName: currentUser.secondLastName || "",
        birthDate: currentUser.birthDate || "",
        phone: currentUser.phone || "",
        avatar: currentUser.avatar || ""
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  // Convierte imagen a base64 y actualiza avatar en estado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(userData);
    alert("Datos actualizados correctamente");
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Administrar perfil</h2>
        <nav className="tabs">
          <div className={`tab ${tab === "personal" ? "active" : ""}`} onClick={() => setTab("personal")}>
            Personal
          </div>
          <div className={`tab ${tab === "addresses" ? "active" : ""}`} onClick={() => setTab("addresses")}>
            Direcciones
          </div>
          <div className={`tab ${tab === "payments" ? "active" : ""}`} onClick={() => setTab("payments")}>
            Pagos
          </div>
        </nav>

        {tab === "personal" && (
          <form className="profile-form" onSubmit={handleSave}>
            <div className="form-group">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt="Foto de perfil"
                  style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginBottom: "1rem", marginTop: "1rem" }}
                />
              ) : (
                <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#ccc", marginBottom: "1rem" }} />
              )}
              <input type="file" id="profile-pic" onChange={handleFileChange} />
              <label htmlFor="profile-pic">Foto de Perfil</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="doc-id"
                name="document"
                value={userData.document}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="doc-id">Documento</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="first-name">Primer nombre</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="middle-name"
                name="middleName"
                value={userData.middleName}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="middle-name">Segundo nombre</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="last-name">Primer apellido</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="second-last-name"
                name="secondLastName"
                value={userData.secondLastName}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="second-last-name">Segundo apellido</label>
            </div>

            <div className="form-group">
              <input
                type="date"
                id="birth-date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="birth-date">Fecha de Nacimiento</label>
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="phone">Teléfono</label>
            </div>

            <button type="submit" className="primary-btn">Guardar cambios</button>
          </form>
        )}

        {/* Tab direcciones y pagos sin cambios (los dejo igual que antes) */}
        {tab === "addresses" && (
          <AddressManager />
        )}

        {tab === "payments" && (
          <PaymentManager />
        )}
      </div>
    </>
  );
};

export default ProfileAdmin;
