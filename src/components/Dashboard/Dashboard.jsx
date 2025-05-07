import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <p>Track your finances and achieve your goals</p>
      </header>

      <section className="dashboard-cards">
        <div className="card">
          <div className="card-title">Total Balance</div>
          <div className="card-value">$12,750.00</div>
          <div className="card-trend positive">+2.5% from last month</div>
        </div>
        <div className="card">
          <div className="card-title">Monthly Income</div>
          <div className="card-value income">$4,500.00</div>
          <div className="card-trend positive">+5.2% from last month</div>
        </div>
        <div className="card">
          <div className="card-title">Monthly Expenses</div>
          <div className="card-value expense">$2,850.00</div>
          <div className="card-trend negative">+3.1% from last month</div>
        </div>
        <div className="card">
          <div className="card-title">Savings Goal</div>
          <div className="card-value goal">$20,000.00</div>
          <div className="card-trend positive">63.75% achieved</div>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="spending-trends">
          <div className="section-header">
            <div className="section-title">Spending Trends</div>
            <div className="section-actions">
              <button className="btn-outline active">Monthly</button>
              <button className="btn-outline">Quarterly</button>
              <button className="btn-outline">Yearly</button>
            </div>
          </div>
          <div className="chart-placeholder">
            <div className="chart-message">Loading chart data...</div>
          </div>
        </div>

        <div className="savings-progress">
          <div className="section-header">
            <div className="section-title">Savings Goal Progress</div>
            <button className="btn-primary">Add Goal</button>
          </div>
          <div className="progress-group">
            <div className="progress-label">
              Vacation Fund
              <span className="progress-amount">$2,500/$5,000</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '50%'}}></div>
            </div>
          </div>
          <div className="progress-group">
            <div className="progress-label">
              Emergency Fund
              <span className="progress-amount">$10,000/$15,000</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '66%'}}></div>
            </div>
          </div>
          <div className="progress-group">
            <div className="progress-label">
              New Car
              <span className="progress-amount">$8,000/$30,000</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '27%'}}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-bottom">
        <div className="budget-status">
          <div className="section-header">
            <div className="section-title">Monthly Budget Status</div>
            <button className="btn-outline">View All</button>
          </div>
          <ul>
            <li>
              <span className="dot green"></span>
              <span className="budget-label">Housing</span>
              <span className="budget-amount">$1,200/$1,500</span>
              <span className="budget-arrow green">↘️</span>
            </li>
            <li>
              <span className="dot red"></span>
              <span className="budget-label">Food</span>
              <span className="budget-amount">$650/$500</span>
              <span className="budget-arrow red">↗️</span>
            </li>
            <li>
              <span className="dot yellow"></span>
              <span className="budget-label">Transportation</span>
              <span className="budget-amount">$350/$400</span>
              <span className="budget-arrow green">↘️</span>
            </li>
            <li>
              <span className="dot blue"></span>
              <span className="budget-label">Entertainment</span>
              <span className="budget-amount">$280/$300</span>
              <span className="budget-arrow green">↘️</span>
            </li>
          </ul>
        </div>

        <div className="recent-transactions">
          <div className="section-header">
            <div className="section-title">Recent Transactions</div>
            <button className="btn-outline">View All</button>
          </div>
          <ul>
            <li>
              <span className="tx-icon red-bg"><span className="tx-arrow">↓</span></span>
              <div className="tx-details">
                <span className="tx-label">Grocery Store</span>
                <span className="tx-date">Today</span>
              </div>
              <span className="tx-amount red">$120.45</span>
            </li>
            <hr />
            <li>
              <span className="tx-icon green-bg"><span className="tx-arrow">↑</span></span>
              <div className="tx-details">
                <span className="tx-label">Salary Deposit</span>
                <span className="tx-date">Yesterday</span>
              </div>
              <span className="tx-amount green">+$2500.00</span>
            </li>
            <hr />
            <li>
              <span className="tx-icon red-bg"><span className="tx-arrow">↓</span></span>
              <div className="tx-details">
                <span className="tx-label">Internet Bill</span>
                <span className="tx-date">Apr 18</span>
              </div>
              <span className="tx-amount red">$75.00</span>
            </li>
            <hr />
            <li>
              <span className="tx-icon red-bg"><span className="tx-arrow">↓</span></span>
              <div className="tx-details">
                <span className="tx-label">Restaurant</span>
                <span className="tx-date">Apr 17</span>
              </div>
              <span className="tx-amount red">$45.80</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Dashboard; 