import React from "react";
interface Result {
  date: string;
  time: number;
  errors: number;
  difficulty: string;
  score: number;
}
const Results: React.FC = () => {
  
  const results: Result[] = JSON.parse(localStorage.getItem("results") || "[]");


  return (
    <div>
      <h1>Результаты игр</h1>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Время прохождения</th>
            <th>Ошибки</th>
            <th>Сложность</th>
            <th>Счет</th>
          </tr>
        </thead>
        <tbody>
        {results && results.length > 0 ? (
            results.map((result, index) => (
              <tr key={index}>
                <td>{result.date}</td>
                <td>{result.time} секунд</td>
                <td>{result.errors}</td>
                <td>{result.difficulty}</td>
                <td>{result.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Нет результатов</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
