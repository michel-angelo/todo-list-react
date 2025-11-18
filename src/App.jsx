// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Pengguna from "./pages/Pengguna.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pengguna" element={<Pengguna />} />
      </Routes>
    </div>
  );
}

export default App;
