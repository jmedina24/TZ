import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title className="fw-bold">${product.price}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.name}</Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary">Añadir al carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
