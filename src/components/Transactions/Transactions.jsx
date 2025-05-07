import React from 'react';
import '../Dashboard/Dashboard.css';
import './Transactions.css';

const transactions = [
  { desc: 'Grocery Store', category: 'Food', date: '4/19/2025', amount: -120.45 },
  { desc: 'Salary Deposit', category: 'Income', date: '4/18/2025', amount: 2500.00 },
  { desc: 'Internet Bill', category: 'Utilities', date: '4/18/2025', amount: -75.00 },
  { desc: 'Restaurant', category: 'Food', date: '4/17/2025', amount: -45.80 },
  { desc: 'Gas', category: 'Transportation', date: '4/15/2025', amount: -35.50 },
  { desc: 'Movie Theater', category: 'Entertainment', date: '4/14/2025', amount: -24.00 },
  { desc: 'Electric Bill', category: 'Utilities', date: '4/10/2025', amount: -95.20 },
  { desc: 'Side Project', category: 'Income', date: '4/8/2025', amount: 350.00 },
  { desc: 'Clothing', category: 'Shopping', date: '4/5/2025', amount: -89.99 },
  { desc: 'Healthcare', category: 'Healthcare', date: '4/3/2025', amount: -125.00 },
];

function Transactions() {
  return (
    <main className="dashboard-main" style={{ marginLeft: 285 }}>
      <div className="transactions-header-row">
        <div>
          <h1>Transactions</h1>
          <p>Manage your income and expenses</p>
        </div>
        <div className="transactions-actions">
          <button className="filter-btn">&#128269; Filter</button>
          <button className="add-btn">+ Add Transaction</button>
        </div>
      </div>
      <div className="transactions-table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i}>
                <td className="tx-desc">
                  <span className={`tx-table-icon ${tx.amount > 0 ? 'green-bg' : 'red-bg'}`}>
                    <span className="tx-arrow">{tx.amount > 0 ? '↑' : '↓'}</span>
                  </span>
                  <span className="tx-desc-label">{tx.desc}</span>
                </td>
                <td>{tx.category}</td>
                <td>{tx.date}</td>
                <td className={`tx-table-amount ${tx.amount > 0 ? 'green' : 'red'}`}>{tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `$${Math.abs(tx.amount).toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Transactions;
