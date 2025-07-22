import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length > 5) {
      localStorage.setItem("fintrack-signed-in", "true");
      if (onSignIn) onSignIn();
      navigate("/", { replace: true });
    } else {
      setError("Password must be more than 5 characters.");
    }
  };

  return (
    <div className="signin-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background-color)' }}>
      <form className="card" style={{ minWidth: 320, maxWidth: 360 }} onSubmit={handleSubmit}>
        <h2 className="page-title" style={{ textAlign: 'center', marginBottom: 24 }}>Sign In</h2>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red mb-4" style={{ fontSize: 14 }}>{error}</div>}
        <button className="btn btn-primary w-full" type="submit">Sign In</button>
      </form>
    </div>
  );
} 