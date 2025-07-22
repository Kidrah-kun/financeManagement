import { useState, useEffect } from "react"

export default function Budget({ budgetCategories, addBudgetCategory, transactions }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    color: "#3b82f6", 
  })
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    // Generate budget suggestions based on spending habits
    const currentMonth = new Date().getMonth()
    const monthlyExpenses = transactions.filter(
      (t) => t.type === "expense" && new Date(t.date).getMonth() === currentMonth,
    )

    const categorySpending = {}
    monthlyExpenses.forEach((expense) => {
      categorySpending[expense.category] = (categorySpending[expense.category] || 0) + expense.amount
    })

    const newSuggestions = Object.entries(categorySpending).map(([category, amount]) => ({
      category,
      currentSpending: amount,
      suggestedBudget: Math.ceil(amount * 1.1), // Suggest 10% more than current spending
    }))

    setSuggestions(newSuggestions)
  }, [transactions])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.budget) {
      addBudgetCategory({
        ...formData,
        budget: Number.parseFloat(formData.budget),
      })
      setFormData({ name: "", budget: "", color: "#3b82f6" })
      setShowForm(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Calculate actual spending for each budget category
  const categoriesWithSpending = budgetCategories.map((category) => {
    const spent = transactions
      .filter((t) => t.type === 'expense' && t.category === category.name)
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...category, spent };
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Budget Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-header">New Budget Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Groceries"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  step="0.01"
                  className="form-input"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Category Color</label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="form-input"
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
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="budget-grid">
        {categoriesWithSpending.length === 0 ? (
          <div className="card col-span-full text-center py-12">
            <p className="text-lg font-medium text-gray-500">No budget categories yet.</p>
            <p className="text-sm text-gray-400">Add a category to start tracking your budget.</p>
          </div>
        ) : (
          categoriesWithSpending.map((category) => {
            const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
            const isOverBudget = category.spent > category.budget;

            return (
              <div key={category.id} className="budget-card">
                <div className="budget-header">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></span>
                    <h3 className="budget-title">{category.name}</h3>
                  </div>
                  <div className={`budget-status ${isOverBudget ? 'status-over' : 'status-good'}`}>
                    {isOverBudget ? "Over Budget" : "On Track"}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <div className="progress-header">
                    <span className="font-bold">${category.spent.toFixed(2)}</span>
                    <span className="text-gray">/ ${category.budget.toFixed(2)}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isOverBudget ? 'var(--danger-color)' : category.color
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray mt-2">
                    {isOverBudget 
                      ? `$${(category.spent - category.budget).toFixed(2)} over budget`
                      : `$${(category.budget - category.spent).toFixed(2)} remaining`
                    }
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Budget Suggestions */}
      {suggestions.length > 0 && (
        <div className="card">
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Budget Suggestions</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
            Based on your spending habits, here are some budget recommendations:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {suggestions.map((suggestion, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '16px', 
                backgroundColor: '#eff6ff', 
                borderRadius: '8px',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontWeight: '500', wordBreak: 'break-word' }}>{suggestion.category}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>
                    Current spending: ${suggestion.currentSpending.toFixed(2)}/month
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontWeight: '600', color: '#2563eb', fontSize: '14px' }}>
                    Suggested: ${suggestion.suggestedBudget.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      setFormData({
                        name: suggestion.category,
                        budget: suggestion.suggestedBudget.toString(),
                      })
                      setShowForm(true)
                    }}
                    style={{ 
                      fontSize: '12px', 
                      color: '#2563eb', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Use this suggestion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
