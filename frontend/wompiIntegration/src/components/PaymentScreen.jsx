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
      alert('Please enter a valid amount greater than zero.');
      return;
    }
    setConfirmedAmount(amount);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Payment Portal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#payment">Payment</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="mb-4">Complete Your Payment</h2>
            <Form>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Enter Amount (COP)</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  min="1"
                  placeholder="Enter amount in COP"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleConfirmAmount}>
                Confirm Amount
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
