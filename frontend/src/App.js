import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todo from "./components/Main";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const location = useLocation();


  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);  

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/main" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={isLoggedIn ? <Todo /> : <Navigate to="/login" />} />
      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;