import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    fetch('/users')
    .then(resp => resp.json())
    .then(users => console.log(users))
  }, [])

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
