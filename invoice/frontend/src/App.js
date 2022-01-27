import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import Invoice from "./components/Invoice";
import SettingsPage from "./components/SettingsPage";
import Generatepdf from "./components/Generatepdf";
import Invoicehistory from "./components/Invoicehistory";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/addinvoice" element={<Invoice />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/generatepdf" element={<Generatepdf />} />
                    <Route
                        path="/invoicehistory"
                        element={<Invoicehistory />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
