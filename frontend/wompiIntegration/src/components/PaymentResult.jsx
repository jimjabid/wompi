// PaymentResult.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Alert, Spinner, Navbar, Nav, Table,Button } from 'react-bootstrap';

const PaymentResult = () => {
  const location = useLocation();
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const transactionId = query.get('id');
    const env = query.get('env');

    console.log('Transaction ID:', transactionId);
    console.log('Environment:', env);

    const fetchTransactionStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/transaction-status?id=${transactionId}`);
        console.log('API Response:', response.data);
        const { data } = response;

        if (data && data.data) {
          setTransactionData(data.data);
          console.log('Transaction Data:', data.data);
        } else {
          setError('Invalid transaction data received.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching transaction status:', error);
        setError('Failed to retrieve payment status.');
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchTransactionStatus();
    } else {
      setError('No transaction ID provided.');
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Payment Portal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/payment">Payment</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2>Payment Result</h2>
        {loading ? (
          <Alert variant="info">
            <Spinner animation="border" size="sm" /> Fetching payment status...
          </Alert>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Alert variant={transactionData.status === 'APPROVED' ? 'success' : 'warning'}>
              Your payment has been {transactionData.status.toLowerCase()}.
            </Alert>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td><strong>Transaction ID</strong></td>
                  <td>{transactionData.id}</td>
                </tr>
                <tr>
                  <td><strong>Reference</strong></td>
                  <td>{transactionData.reference}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>{transactionData.status}</td>
                </tr>
                <tr>
                  <td><strong>Amount</strong></td>
                  <td>{transactionData.amount_in_cents / 100} COP</td>
                </tr>
                <tr>
                  <td><strong>Payment Method</strong></td>
                  <td>{transactionData.payment_method_type}</td>
                </tr>
                {/* Add more fields as necessary */}
              </tbody>
            </Table>
            <Link to="/payment">
              <Button variant="primary">Make Another Payment</Button>
            </Link>
          </>
        )}
      </Container>
    </>
  );
};

export default PaymentResult;
