// PaymentScreen.jsx
import React, { useState } from 'react';
import { Container, Form, Col, Row, Navbar, Nav, Alert, Button } from 'react-bootstrap';
import WompiButton from './WompiButton'; // Import the WompiButton component

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [confirmedAmount, setConfirmedAmount] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConfirmAmount = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Ingese una cantidad mayor a cero');
      return;
    }
    setConfirmedAmount(amount);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Portal de Pagos Wompi</Navbar.Brand>
      
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="mb-4">Complete su Pago</h2>
            <Form>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Ingrese monto a pagar (COP)</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  min="1"
                  placeholder="Ingrese el monto en COP"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleConfirmAmount}>
                Confirmar monto
              </Button>
            </Form>

            {confirmedAmount && (
              <WompiButton amount={confirmedAmount} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentScreen;
