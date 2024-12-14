import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/auth";
// In src/index.js or src/App.js
import './styles.css';  // Import the custom CSS


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect root URL to /auth */}
                <Route path="/" element={<Navigate to="/auth" />} />

                {/* Auth route for both login and signup */}
                <Route path="/auth" element={<Auth />} />

                {/* Dashboard route */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Fallback route for unknown URLs */}
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </Router>
    );
};

export default App;
