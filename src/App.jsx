import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';
import Budget from './components/Budget/Budget';
// import other pages as needed

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budget" element={<Budget />} />
        {/* Add routes for other pages here */}
      </Routes>
    </Router>
  );
}

export default App;
