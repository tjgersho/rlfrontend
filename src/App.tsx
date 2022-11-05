import React from 'react';
import Counter from './components/Counter';
import RLLayout from './components/RLLayout';
import SpacecraftSelect from './components/SpacecraftSelect';

function App() {

  React.useEffect(()=>{
    
  }, []);
  const rockets = ["Test", "Test2"];
  const rocketSelected = (index: number)=>{
    console.log("Rocekt..");
    console.log(rockets[index]);
  };
  return (
    <RLLayout>
      <div className="relative text-clifford flex flex-col w-full h-full overflow-hidden">

        <div className="m-5">

          <SpacecraftSelect options={rockets} onOptionSelect={rocketSelected}/>

          <h1 className="text-red-500">{}</h1>

        </div>

      
    
      </div>
    </RLLayout>
  );
}

export default App;
