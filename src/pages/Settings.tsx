import React, { useState } from "react";
import { useGameContext } from "../context/GameContext";

const Settings: React.FC = () => {
  const {  setGameState } = useGameContext();

  const [rows, setRows] = useState(4); 
  const [cols, setCols] = useState(4); 
  const [timeLimit, setTimeLimit] = useState(60); 
  const [maxErrors, setMaxErrors] = useState(15); 

  const handleSave = () => {
    setGameState((prev) => ({
      ...prev,
      rows,
      cols,
      timeLimit,
      maxErrors,
    }));
    alert("Настройки сохранены!");
  };

  return (
    <div className="settings">
      <h2>Настройки игры</h2>
      <div>
        <label>
          Размер поля:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
          x
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Отведённое время (в секундах):
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Максимальное количество ошибок:
          <input
            type="number"
            value={maxErrors}
            onChange={(e) => setMaxErrors(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleSave}>Сохранить настройки</button>
    </div>
  );
};

export default Settings;
