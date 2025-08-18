export const orders = [
  {
    id: "001",
    date: "2025-08-18",
    status: "Entregado",
    total: 120,
    products: [
      { name: "Mouse Gamer", quantity: 1, price: 50 },
      { name: "Teclado Mecánico", quantity: 1, price: 70 },
    ],
    paymentMethod: "Tarjeta Visa",
    invoiceUrl: "/facturas/001.pdf",
  },
  {
    id: "002",
    date: "2025-08-15",
    status: "En camino",
    total: 250,
    products: [
      { name: "Monitor 24\"", quantity: 1, price: 150 },
      { name: "Auriculares", quantity: 2, price: 50 },
    ],
    paymentMethod: "Mercado Pago",
    invoiceUrl: "/facturas/002.pdf",
  },
  {
    id: "003",
    date: "2025-08-10",
    status: "Cancelado",
    total: 80,
    products: [
      { name: "Cargador USB-C", quantity: 2, price: 40 },
    ],
    paymentMethod: "Efectivo",
    invoiceUrl: "/facturas/003.pdf",
  },
];
