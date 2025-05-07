import React from 'react';
import './Budget.css';

function Budget() {
  return (
    <main className="budget-main">
      <header className="budget-header">
        <h1>Budget</h1>
        <p>Manage and track your monthly spending</p>
      </header>
      <div className="budget-content">
        {/* Budget Overview */}
        <section className="budget-overview-section">
          <div className="budget-overview-header">
            <span className="section-title">Budget Overview</span>
            <button className="btn-primary">+ Add Category</button>
          </div>
          <div className="card budget-overview-card">
            <div className="budget-row budget-row-total">
              <span className="budget-label budget-label-total">Total Budget</span>
              <span className="budget-value budget-value-total">$2,860 / $3,150</span>
            </div>
            <div className="budget-bar-row">
              <span className="budget-used">90.8% used</span>
              <div className="budget-bar-container"><div className="budget-bar blue" style={{width: '90.8%'}}></div></div>
              <span className="budget-remaining">$290 remaining</span>
            </div>
            {/* Housing */}
            <div className="budget-row">
              <span className="budget-dot blue"></span>
              <span className="budget-label bold">Housing</span>
              <span className="budget-value bold">$1,200 / $1,500</span>
            </div>
            <div className="budget-bar-row">
              <span className="budget-used">80.0% used</span>
              <div className="budget-bar-container"><div className="budget-bar blue" style={{width: '80%'}}></div></div>
              <span className="budget-remaining">$300 remaining</span>
            </div>
            {/* Food */}
            <div className="budget-row">
              <span className="budget-dot green"></span>
              <span className="budget-label bold">Food</span>
              <span className="budget-value bold">$650 / $500</span>
            </div>
            <div className="budget-bar-row">
              <span className="budget-used">130.0% used</span>
              <div className="budget-bar-container">
                <div className="budget-bar green" style={{width: '100%'}}></div>
                <div className="budget-bar red" style={{width: '30%'}}></div>
              </div>
              <span className="budget-remaining white">-$150 remaining</span>
            </div>
            {/* Transportation */}
            <div className="budget-row">
              <span className="budget-dot yellow"></span>
              <span className="budget-label bold">Transportation</span>
              <span className="budget-value bold">$350 / $400</span>
            </div>
            <div className="budget-bar-row">
              <span className="budget-used">87.5% used</span>
              <div className="budget-bar-container"><div className="budget-bar yellow" style={{width: '87.5%'}}></div></div>
              <span className="budget-remaining">$50 remaining</span>
            </div>
            {/* Entertainment */}
            <div className="budget-row">
              <span className="budget-dot purple"></span>
              <span className="budget-label bold">Entertainment</span>
              <span className="budget-value bold">$280 / $300</span>
            </div>
            <div className="budget-bar-row">
              <span className="budget-used">93.3% used</span>
              <div className="budget-bar-container"><div className="budget-bar purple" style={{width: '93.3%'}}></div></div>
              <span className="budget-remaining">$20 remaining</span>
            </div>
            {/* Utilities */}
            <div className="budget-row">
              <span className="budget-dot red"></span>
              <span className="budget-label bold">Utilities</span>
              <span className="budget-value bold">$230 / $250</span>
            </div>
            <div className="budget-bar-row">
              <span className="budget-used">92.0% used</span>
              <div className="budget-bar-container"><div className="budget-bar red" style={{width: '92%'}}></div></div>
              <span className="budget-remaining">$20 remaining</span>
            </div>
            {/* Healthcare */}
            <div className="budget-row">
              <span className="budget-dot magenta"></span>
              <span className="budget-label bold">Healthcare</span>
              <span className="budget-value bold">$150 / $200</span>
            </div>
            <div className="budget-bar-row">
              <span className="budget-used">75.0% used</span>
              <div className="budget-bar-container"><div className="budget-bar magenta" style={{width: '75%'}}></div></div>
              <span className="budget-remaining">$50 remaining</span>
            </div>
          </div>
        </section>
        {/* Budget Insights */}
        <section className="budget-insights-section">
          <div className="card budget-insights-card">
            <span className="section-title">Budget Insights</span>
            <div className="budget-insights-summary">
              <div className="budget-insights-label">Monthly Summary</div>
              <div className="budget-insights-total">$3,150</div>
              <div className="budget-insights-desc">Total budget for this month</div>
            </div>
            <div className="budget-status-box">
              <span className="budget-status-ontrack">On track <span role="img" aria-label="down">↘️</span></span>
              <span className="budget-status-remaining">You have $290 remaining</span>
            </div>
            <div className="budget-insights-label">Suggestions</div>
            <ul className="budget-insights-suggestions">
              <li><span className="red">•</span> Reduce spending on Food by $150</li>
            </ul>
            <button className="btn-outline budget-settings-btn"><span role="img" aria-label="settings">⚙️</span> Budget Settings</button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Budget;
