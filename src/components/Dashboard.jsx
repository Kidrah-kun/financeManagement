import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NEWS_API_KEY = "29ab07782b824cbd8c41900398a65701";

export default function Dashboard({ transactions, savingsGoals, budgetCategories }) {
  const [monthlyData, setMonthlyData] = useState([])
  const [news, setNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsError, setNewsError] = useState("")

  useEffect(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const data = months.map((month, index) => {
      const income = 4000 + Math.random() * 1000
      const expenses = 2500 + Math.random() * 1000
      return { month, income, expenses }
    })
    setMonthlyData(data)
  }, [])

  // Fetch news headlines
  useEffect(() => {
    async function fetchNews() {
      setNewsLoading(true)
      setNewsError("")
      try {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${NEWS_API_KEY}`)
        const data = await res.json()
        if (data.status === "ok") {
          setNews(data.articles)
        } else {
          setNewsError("Could not fetch news.")
        }
      } catch (e) {
        setNewsError("Could not fetch news.")
      } finally {
        setNewsLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Calculate totals
  const totalBalance = transactions.reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0)
  const monthlyIncome = transactions
    .filter((t) => t.type === "income" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)
  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)

  const chartData = [
    { name: 'Income', value: monthlyIncome, fill: 'var(--success-color)' },
    { name: 'Expenses', value: monthlyExpenses, fill: 'var(--danger-color)' },
  ];

  const totalSavingsGoal = savingsGoals.reduce((sum, goal) => sum + goal.target, 0)

  const recentTransactions = transactions.slice(0, 5)

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-label">Total Balance</p>
            <div className="stat-icon balance-icon">💰</div>
          </div>
          <p className="stat-value">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-label">Monthly Income</p>
            <div className="stat-icon income-icon">📈</div>
          </div>
          <p className="stat-value text-green">${monthlyIncome.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-label">Monthly Expenses</p>
            <div className="stat-icon expense-icon">📉</div>
          </div>
          <p className="stat-value text-red">${monthlyExpenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Transactions */}
        <div className="card col-span-7">
          <h2 className="card-header">Recent Transactions</h2>
          <div className="transaction-list">
            {recentTransactions.map((t) => (
              <div key={t.id} className="transaction-item">
                <div className={`transaction-icon ${t.type}`}>
                  {t.type === "income" ? '▲' : '▼'}
                </div>
                <div className="transaction-details">
                  <h4>{t.description}</h4>
                  <p className="transaction-meta">{t.category} · {new Date(t.date).toLocaleDateString()}</p>
                </div>
                <span className={`transaction-amount ${t.type === "income" ? "amount-positive" : "amount-negative"}`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goals */}
        <div className="card col-span-5">
          <h2 className="card-header">Savings Goals</h2>
          <div className="flex flex-col gap-4">
            {savingsGoals.slice(0, 3).map((goal) => (
              <div key={goal.id}>
                <div className="progress-header">
                  <span className="font-bold">{goal.name}</span>
                  <span>${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Budget Status */}
        <div className="card col-span-6">
          <h2 className="card-header">Budget Status</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip
                  cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                  contentStyle={{
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-md)',
                  }}
                />
                <Bar dataKey="value" barSize={30} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Categories */}
        <div className="card col-span-6">
          <h2 className="card-header">Budget Categories</h2>
          <div className="flex flex-col gap-2">
            {budgetCategories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  <span>{cat.name}</span>
                </div>
                <div className='flex items-center gap-4'>
                  <span>${cat.spent.toFixed(2)} / ${cat.budget.toFixed(2)}</span>
                  <div className={`budget-status ${cat.spent > cat.budget ? 'status-over' : 'status-good'}`}>
                    {cat.spent > cat.budget ? 'Over' : 'Good'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="card mt-8">
        <h2 className="card-header">Latest News</h2>
        {newsLoading && <p>Loading news...</p>}
        {newsError && <p className="text-red">{newsError}</p>}
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {news.map((article, idx) => (
            <li key={idx} style={{ marginBottom: 12 }}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontWeight: 500 }}>
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}