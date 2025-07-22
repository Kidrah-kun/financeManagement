import { useState } from "react"

export default function SavingsGoals({ savingsGoals, addSavingsGoal, updateSavingsGoal }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    target: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.target) {
      addSavingsGoal({
        ...formData,
        target: Number.parseFloat(formData.target),
      })
      setFormData({ name: "", target: "" })
      setShowForm(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addToGoal = (goalId, amount) => {
    const goal = savingsGoals.find((g) => g.id === goalId)
    if (goal) {
      const newCurrent = Math.min(goal.current + amount, goal.target);
      updateSavingsGoal(goalId, { current: newCurrent });
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Savings Goals</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          + Add New Goal
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-header">New Savings Goal</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Goal Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Vacation Fund"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Amount</label>
                <input
                  type="number"
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  step="0.01"
                  className="form-input"
                  placeholder="0.00"
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
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="goals-grid">
        {savingsGoals.length === 0 ? (
          <div className="card col-span-full text-center py-12">
            <p className="text-lg font-medium text-gray-500">No savings goals yet.</p>
            <p className="text-sm text-gray-400">Click "Add New Goal" to create your first one.</p>
          </div>
        ) : (
          savingsGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100
            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-header">
                  <h3 className="goal-title">{goal.name}</h3>
                  <span className="text-2xl">🎯</span>
                </div>
                
                <div className="mt-auto pt-4">
                  <div className="progress-header">
                    <span className="font-bold text-primary">${goal.current.toFixed(2)}</span>
                    <span className="text-gray">/ ${goal.target.toFixed(2)}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray mt-2">
                    {progress.toFixed(0)}% complete
                  </p>
                </div>

                <div className="goal-actions">
                  <button onClick={() => addToGoal(goal.id, 50)} className="btn btn-secondary btn-sm">+$50</button>
                  <button onClick={() => addToGoal(goal.id, 100)} className="btn btn-secondary btn-sm">+$100</button>
                  <button onClick={() => addToGoal(goal.id, 250)} className="btn btn-secondary btn-sm">+$250</button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}