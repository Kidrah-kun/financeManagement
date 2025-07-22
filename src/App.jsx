import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Transactions from "./components/Transactions"
import SavingsGoals from "./components/SavingsGoals"
import Budget from "./components/Budget"
import ExportData from "./components/ExportData"
import Settings from "./components/Settings"
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [transactions, setTransactions] = useState([])
  const [savingsGoals, setSavingsGoals] = useState([])
  const [budgetCategories, setBudgetCategories] = useState([])
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const savedTransactions = localStorage.getItem("fintrack-transactions")
    const savedGoals = localStorage.getItem("fintrack-goals")
    const savedBudget = localStorage.getItem("fintrack-budget")

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      const sampleTransactions = [
        {
          id: 1,
          type: "expense",
          amount: 120.45,
          category: "Food",
          description: "Grocery Store",
          date: new Date().toISOString().split("T")[0],
        },
        {
          id: 2,
          type: "income",
          amount: 2500.0,
          category: "Salary",
          description: "Salary Deposit",
          date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        },
        {
          id: 3,
          type: "expense",
          amount: 75.0,
          category: "Utilities",
          description: "Internet Bill",
          date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
        },
      ]
      setTransactions(sampleTransactions)
    }

    if (savedGoals) {
      setSavingsGoals(JSON.parse(savedGoals))
    } else {
      const sampleGoals = [
        { id: 1, name: "Vacation Fund", target: 5000, current: 2500 },
        { id: 2, name: "Emergency Fund", target: 15000, current: 10000 },
        { id: 3, name: "New Car", target: 30000, current: 8000 },
      ]
      setSavingsGoals(sampleGoals)
    }

    if (savedBudget) {
      setBudgetCategories(JSON.parse(savedBudget))
    } else {
      const sampleBudget = [
        { id: 1, name: "Housing", budget: 1500, spent: 1200, color: "#10b981" },
        { id: 2, name: "Food", budget: 500, spent: 650, color: "#ef4444" },
        { id: 3, name: "Transportation", budget: 400, spent: 350, color: "#f59e0b" },
        { id: 4, name: "Entertainment", budget: 300, spent: 280, color: "#3b82f6" },
      ]
      setBudgetCategories(sampleBudget)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("fintrack-transactions", JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("fintrack-goals", JSON.stringify(savingsGoals))
  }, [savingsGoals])

  useEffect(() => {
    localStorage.setItem("fintrack-budget", JSON.stringify(budgetCategories))
  }, [budgetCategories])

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: transaction.date || new Date().toISOString().split("T")[0],
    }
    setTransactions([newTransaction, ...transactions])
  }

  const addSavingsGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now(),
      current: 0,
    }
    setSavingsGoals([...savingsGoals, newGoal])
  }

  const updateSavingsGoal = (id, updates) => {
    setSavingsGoals(savingsGoals.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)))
  }

  const addBudgetCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now(),
      spent: 0,
      color: "#3b82f6",
    }
    setBudgetCategories([...budgetCategories, newCategory])
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setIsMobileSidebarOpen(false)
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard transactions={transactions} savingsGoals={savingsGoals} budgetCategories={budgetCategories} />
      case "transactions":
        return <Transactions transactions={transactions} addTransaction={addTransaction} />
      case "savings-goals":
        return (
          <SavingsGoals
            savingsGoals={savingsGoals}
            addSavingsGoal={addSavingsGoal}
            updateSavingsGoal={updateSavingsGoal}
          />
        )
      case "budget":
        return (
          <Budget
            budgetCategories={budgetCategories}
            addBudgetCategory={addBudgetCategory}
            transactions={transactions}
          />
        )
      case "export-data":
        return (
          <ExportData transactions={transactions} savingsGoals={savingsGoals} budgetCategories={budgetCategories} />
        )
      case "settings":
        return <Settings />
      default:
        return <Dashboard transactions={transactions} savingsGoals={savingsGoals} budgetCategories={budgetCategories} />
    }
  }

  return (
    <div className="app">
      <div className="mobile-header">
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          ☰
        </button>
        <h1 className="mobile-title">FinTrack</h1>
        <div></div> 
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      <div 
        className={`mobile-sidebar-overlay ${isMobileSidebarOpen ? 'show' : ''}`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />
      <div className={`mobile-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">FinTrack</h1>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="close-btn"
          >
            ✕
          </button>
        </div>
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      <main className="main-content">{renderActiveComponent()}</main>
    </div>
  )
}