import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "transactions", label: "Transactions", icon: "💳" },
    { id: "savings-goals", label: "Savings Goals", icon: "🎯" },
    { id: "budget", label: "Budget", icon: "📈" },
    { id: "export-data", label: "Export Data", icon: "📄" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("fintrack-signed-in");
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">FinTrack</h1>
      </div>
      <nav className="sidebar-nav" style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <button
        className="btn btn-danger"
        style={{ margin: 24, marginTop: 'auto' }}
        onClick={handleLogout}
      >
        🚪 Logout
      </button>
    </div>
  );
}