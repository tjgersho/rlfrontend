import React from 'react';
import Counter from './components/Counter';

function App() {

  React.useEffect(()=>{
    
  }, [])
  return (
    <div className="text-clifford flex flex-col justify-center items-center w-full h-full">
      <h1 className="font-bold text-xl">RL Frontend:</h1>

      <p className="font-medium text-lg">Select Rocket:</p>

      <Counter />

 
  </div>
  );
}

export default App;
