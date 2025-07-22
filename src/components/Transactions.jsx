import { useState } from "react"

export default function Transactions({ transactions, addTransaction }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const categories = {
    expense: ["Food", "Transportation", "Housing", "Utilities", "Entertainment", "Healthcare", "Shopping", "Other"],
    income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.amount && formData.category && formData.description) {
      addTransaction({
        ...formData,
        amount: Number.parseFloat(formData.amount),
      })
      setFormData({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      })
      setShowForm(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category if type changes
      ...(name === 'type' && { category: '' }),
    }));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          + Add Transaction
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-header">New Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="form-input form-select"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.01"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input form-select"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {categories[formData.type].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="e.g., Groceries"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="transaction-list">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-gray-500">No transactions yet.</p>
              <p className="text-sm text-gray-400">Click "Add Transaction" to get started.</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div key={t.id} className="transaction-item">
                <div className={`transaction-icon ${t.type}`}>
                  {t.type === "income" ? '▲' : '▼'}
                </div>
                <div className="transaction-details">
                  <h4>{t.description}</h4>
                  <p className="transaction-meta">
                    {t.category} • {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`transaction-amount ${t.type === "income" ? "amount-positive" : "amount-negative"}`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}