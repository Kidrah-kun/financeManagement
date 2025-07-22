import { useState } from "react"

export default function Settings() {
  const [currency, setCurrency] = useState("USD")
  const [theme, setTheme] = useState("light")
  const [notifications, setNotifications] = useState(true)

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone and will require a page refresh.")) {
      localStorage.removeItem("fintrack-transactions")
      localStorage.removeItem("fintrack-goals")
      localStorage.removeItem("fintrack-budget")
      alert("All data has been cleared. Please refresh the page to see the changes.")
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="settings-section card">
        <h2 className="card-header">General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-input form-select"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="form-input form-select">
              <option value="light">Light</option>
              <option value="dark">Dark (Coming Soon)</option>
              <option value="auto">System Default</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="notifications" className="form-label mb-0">
              Enable email notifications
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section card mt-6">
        <h2 className="card-header">About FinTrack</h2>
        <div className="text-sm text-gray space-y-1">
          <p><span className="font-semibold">Version:</span> 1.0.0</p>
          <p>A simple and effective personal finance management tool.</p>
          <p>Built with React and love ❤️</p>
        </div>
      </div>
      
      <div className="danger-zone">
        <h3 className="danger-title">Danger Zone</h3>
        <p className="danger-description">
          This action is irreversible. It will permanently delete all your financial data, including transactions, goals, and budget categories.
        </p>
        <button onClick={clearAllData} className="btn btn-danger">
          Clear All Application Data
        </button>
      </div>
    </div>
  )
}