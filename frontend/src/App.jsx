import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentResult from "./components/PaymentResult";
import PaymentScreen from "./components/PaymentScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentScreen />} />
        <Route path="/payment/result" element={<PaymentResult />} />
      </Routes>
    </Router>
  );
}
 export default App