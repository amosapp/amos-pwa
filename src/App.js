import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = (props) => {
  const [text, setText] = React.useState (``)

  React.useEffect(() => {
    setText (localStorage.getItem (`text`))
  }, [])

  const handleChange = (e) => {
    localStorage.setItem (`text`, e.target.value)
    setText (e.target.value)
  }
  
  return (
    <div className="App">
      <p>You typed: {text}</p>
      <input onChange={handleChange}></input>
    </div>
  );
}

export default App;
