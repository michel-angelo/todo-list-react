import { useState } from "react"; // Tambahin useState
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Jadwal from "./pages/Jadwal.jsx";
import Pomodoro from "./pages/Pomodoro.jsx";
import Pengguna from "./pages/Pengguna.jsx";
import DetailPengguna from "./pages/DetailPengguna.jsx";

function App() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const MENU_ITEMS = [
    { path: "/", label: "ToDo" },
    { path: "/jadwal", label: "Jadwal" },
    { path: "/fokus", label: "Fokus" },
    { path: "/pengguna", label: "User" },
  ];

  const getLinkClass = (path, isMobile = false) => {
    const isActive = location.pathname === path;
    const baseClass =
      "font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out block"; // block biar lebar di HP

    if (isActive) {
      return `${baseClass} bg-indigo-600 text-white shadow-md ${
        isMobile ? "text-center" : ""
      }`;
    }
    return `${baseClass} text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 ${
      isMobile ? "text-center bg-slate-50" : ""
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-purple-800 bg-clip-text text-transparent">
              Basthatan
            </div>

            <div className="hidden md:flex gap-2">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={getLinkClass(item.path)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden text-slate-600 hover:text-indigo-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-3 pb-4 animate-fadeIn">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={getLinkClass(item.path, true)}
                  onClick={() => setIsOpen(false)} // Tutup menu pas link diklik
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="/fokus" element={<Pomodoro />} />
          <Route path="/pengguna" element={<Pengguna />} />
          <Route path="/pengguna/:id" element={<DetailPengguna />} />
        </Routes>
      </main>

      <footer className="bg-white py-6 text-center text-slate-400 text-sm border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-1">
          <span>&copy; {new Date().getFullYear()} Made by Proud</span>
          <span className="hidden md:inline">|</span>
          <div className="flex flex-col md:flex-row md:items-center gap-1">
            <span>Basthatan a.k.a Baby Jesus a.k.a Baß</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
