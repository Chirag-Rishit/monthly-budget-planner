import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import "./modal.css";
import LoginPage from "./login/LoginPage";
import CustomerDashboard from "./employee/CustomerDashboard";
import ManagerDashboard from "./manager/ManagerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Login */}
        <Route path="/" element={<LoginPage />} />

        {/* After login, redirect based on role */}
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
