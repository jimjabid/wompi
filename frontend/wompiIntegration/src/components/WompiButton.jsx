// WompiButton.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WompiButton = ({ amount }) => {
  const buttonContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const loadWompiWidget = async () => {
      setLoading(true);
      setError(null);

      const amountInCents = parseInt(amount, 10) * 100;
      const reference = uuidv4();

      try {
        const response = await axios.post('/api/payments/integrity-signature', {
          reference,
          amountInCents,
          currency: 'COP',
        });

        const { integritySignature } = response.data;

        // Remove existing script if any
        const existingScript = document.getElementById('wompi-widget-script');
        if (existingScript) {
          existingScript.remove();
        }

        // Create script element
        const script = document.createElement('script');
        script.id = 'wompi-widget-script';
        script.src = 'https://checkout.wompi.co/widget.js';
        script.setAttribute('data-render', 'button');
        script.setAttribute('data-public-key', publicKey);
        script.setAttribute('data-currency', 'COP');
        script.setAttribute('data-amount-in-cents', amountInCents.toString());
        script.setAttribute('data-reference', reference);
        script.setAttribute('data-signature:integrity', integritySignature);
        script.setAttribute('data-redirect-url', `${window.location.origin}/payment/result`);
        script.async = true;

        // Append script to the container
        if (buttonContainerRef.current) {
          buttonContainerRef.current.innerHTML = '';
          buttonContainerRef.current.appendChild(script);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading Wompi widget:', error);
        setError('Failed to load payment widget. Please try again.');
        setLoading(false);
      }
    };

    loadWompiWidget();

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const existingScript = document.getElementById('wompi-widget-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [amount, publicKey, navigate]);

  if (loading) {
    return (
      <Alert variant="info">
        <Spinner animation="border" size="sm" /> Loading payment button...
      </Alert>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return <div ref={buttonContainerRef} className="my-3"></div>;
};

export default WompiButton;
