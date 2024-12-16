import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/Game";
import Settings from "./pages/Settings";
import Results from "./pages/Results";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Игровое поле</Link>
          <Link to="/settings">Настройки</Link>
          <Link to="/results">Результаты</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
