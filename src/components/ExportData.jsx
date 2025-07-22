export default function ExportData({ transactions, savingsGoals, budgetCategories }) {
  const exportToCSV = (data, filename) => {
    if (data.length === 0) {
      alert("No data to export")
      return
    }

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Escape commas and quotes in CSV
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportAllDataAsJSON = () => {
    const allData = {
      transactions,
      savingsGoals,
      budgetCategories,
      exportDate: new Date().toISOString(),
    }
    const jsonContent = JSON.stringify(allData, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "fintrack_all_data.json")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportCards = [
    {
      title: 'Transactions',
      description: 'Export all your income and expense records with categories and dates.',
      count: transactions.length,
      icon: '💳',
      buttonLabel: 'Export CSV',
      buttonClass: 'btn-primary',
      action: () => exportToCSV(transactions, 'transactions.csv'),
      disabled: transactions.length === 0,
    },
    {
      title: 'Savings Goals',
      description: 'Export your savings goals, including current progress and target amounts.',
      count: savingsGoals.length,
      icon: '🎯',
      buttonLabel: 'Export CSV',
      buttonClass: 'btn-success',
      action: () => exportToCSV(savingsGoals.map(g => ({ ...g, progress: `${((g.current/g.target)*100).toFixed(1)}%`})), 'savings_goals.csv'),
      disabled: savingsGoals.length === 0,
    },
    {
      title: 'Budget Categories',
      description: 'Export your budget categories with allocated amounts and spending data.',
      count: budgetCategories.length,
      icon: '📈',
      buttonLabel: 'Export CSV',
      buttonClass: 'btn-info',
      action: () => exportToCSV(budgetCategories.map(b => ({ ...b, remaining: b.budget-b.spent })), 'budgets.csv'),
      disabled: budgetCategories.length === 0,
    },
    {
      title: 'All Data (JSON)',
      description: 'Export a complete JSON file of all your data for backup or migration.',
      count: 'Full Backup',
      icon: '📦',
      buttonLabel: 'Export JSON',
      buttonClass: 'btn-secondary',
      action: exportAllDataAsJSON,
      disabled: transactions.length === 0 && savingsGoals.length === 0 && budgetCategories.length === 0,
    },
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Export Data</h1>
      </div>

      <div className="export-grid">
        {exportCards.map((card, index) => (
          <div key={index} className="export-card">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h2 className="export-header">{card.title}</h2>
            <p className="export-description">{card.description}</p>
            <div className="mt-auto pt-4">
              <button
                onClick={card.action}
                className={`btn ${card.buttonClass} w-full`}
                disabled={card.disabled}
              >
                {card.buttonLabel}
              </button>
              <p className="text-xs text-gray mt-2">
                {typeof card.count === 'number' ? `${card.count} items` : card.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8 bg-blue-50 border-blue-200">
        <h3 className="card-header text-blue-800">📊 Export Tips</h3>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-2">
          <li>CSV files can be opened in Excel, Google Sheets, or any spreadsheet application.</li>
          <li>Use exported data for detailed analysis, tax preparation, or financial planning.</li>
          <li>JSON format is ideal for developers or for migrating your data to another service.</li>
          <li>Regularly exporting your data is a great way to maintain backups.</li>
        </ul>
      </div>
    </div>
  )
}