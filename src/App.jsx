import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';
import Budget from './components/Budget/Budget';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budget" element={<Budget />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
