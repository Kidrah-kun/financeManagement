import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SignIn from "./SignIn.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

function RequireAuth({ children }) {
  const signedIn = localStorage.getItem("fintrack-signed-in") === "true";
  const location = useLocation();
  if (!signedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AuthRoute({ children }) {
  const signedIn = localStorage.getItem("fintrack-signed-in") === "true";
  if (signedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function Root() {
  const [signedIn, setSignedIn] = useState(
    localStorage.getItem("fintrack-signed-in") === "true"
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <SignIn onSignIn={() => setSignedIn(true)} />
            </AuthRoute>
          }
        />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
