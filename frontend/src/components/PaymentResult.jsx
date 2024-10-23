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
    

    

    const fetchTransactionStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/transaction-status?id=${transactionId}`);
       
        const { data } = response;

        if (data && data.data) {
          setTransactionData(data.data);
        
        } else {
          setError('Data de la transaction invalido');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error buscando la transaccion', error);
        setError('Fallo al recibir el pago');
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchTransactionStatus();
    } else {
      setError('ID de la transaccion no encontrado.');
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"> Portal de Pagos Wompi</Navbar.Brand>
   
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2>Resultados del Pago</h2>
        {loading ? (
          <Alert variant="info">
            <Spinner animation="border" size="sm" /> Buscando estado del pago....
          </Alert>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Alert variant={transactionData.status === 'APPROVED' ? 'success' : 'warning'}>
              Tu pago a sido {transactionData.status.toLowerCase()}.
            </Alert>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td><strong>ID de la Transaccion</strong></td>
                  <td>{transactionData.id}</td>
                </tr>
                <tr>
                  <td><strong>Referencia</strong></td>
                  <td>{transactionData.reference}</td>
                </tr>
                <tr>
                  <td><strong>Estado</strong></td>
                  <td>{transactionData.status}</td>
                </tr>
                <tr>
                  <td><strong>Monto</strong></td>
                  <td>{transactionData.amount_in_cents / 100} COP</td>
                </tr>
                <tr>
                  <td><strong>Metodo de Pago</strong></td>
                  <td>{transactionData.payment_method_type}</td>
                </tr>
                {/* Add more fields as necessary */}
              </tbody>
            </Table>
            <Link to="/payment">
              <Button variant="primary">Realizar otro Pago</Button>
            </Link>
          </>
        )}
      </Container>
    </>
  );
};

export default PaymentResult;
