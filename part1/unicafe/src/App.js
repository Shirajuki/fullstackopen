import React, { useState } from "react";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;
  const getAverage = () => ((good + bad * -1) / 9).toFixed(2);
  const getPositive = () => (good / getAll()).toFixed(2);
  return (
    <div>
      {good + neutral + bad === 0 ? (
        <p>No feedbacks given</p>
      ) : (
        <table>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={getAll()} />
          <Statistic text="average" value={getAverage()} />
          <Statistic text="positive" value={getPositive() + " %"} />
        </table>
      )}
    </div>
  );
};
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
