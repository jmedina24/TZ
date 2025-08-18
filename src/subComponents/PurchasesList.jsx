import React, { useState } from "react";
import { orders } from "../data/orders";
import PurchaseCard from "./PurchaseCard";
import PurchaseModal from "./PurchaseModal";
import Header from '../components/Header';
import "../css/purchaseList.css";

const PurchasesList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchNumber = order.id.toLowerCase().includes(search.toLowerCase());
    const matchDate = filterDate ? order.date === filterDate : true;
    return matchNumber && matchDate;
  });

  return (
    <>
    <Header />
    
      <div className="purchases-list">
        <h2 className="purchase__title">Mis compras</h2>
        {/* Botón de filtros */}
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i class="bi bi-funnel"></i> Filtrar
        </button>

        {/* Panel de filtros deslizable */}
        <div className={`filters-panel ${showFilters ? "open" : ""}`}>
          <input
            type="text"
            placeholder="Número de pedido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-input"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Lista de compras */}
        {filteredOrders.map((order) => (
          <PurchaseCard
            key={order.id}
            order={order}
            onViewDetails={(order) => setSelectedOrder(order)}
          />
        ))}

        {selectedOrder && (
          <PurchaseModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </>
  );
};

export default PurchasesList;
