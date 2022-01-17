import { useEffect } from 'react';
import Home from './Home';
import Matches from './Matches';

import './App.css';


function App() {

  // useEffect(() => {
  //   fetch('/users')
  //   .then(resp => resp.json())
  //   .then(users => console.log(users))
  // }, [])

  // will be dynamic after auth is implemented
  // make change in matchObj from handleSwipe
  const userId = 1

  return (
    <div className="App">
      <Home userId={userId} />
      <Matches userId={userId} />
    </div>
  );
}

export default App;
