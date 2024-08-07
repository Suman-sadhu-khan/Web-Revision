import { useContext } from 'react';
import './App.css';
import Counter from './components/Counter';
import { CounterContext } from './contex/Counter';




function App() {

  const counterState=useContext(CounterContext);

  console.log(counterState);
  return (
    <div className="App">
      <h1>Count is {counterState.count}</h1>
      <Counter/>
      <Counter/>
      <Counter/>
      <Counter/>
    </div>
  );
}

export default App;
