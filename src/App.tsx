import React from 'react';
import RLLayout from './components/RLLayout';
import SpacecraftSelect from './components/SpacecraftSelect';
import { useDispatch, useSelector } from 'react-redux';
import { setRockets } from './redux/slices/rocketsSlice';
import { rocketEndpoint } from './endpoints';
import { setSelectedRocket } from './redux/slices/selectedRocketSlice';

const  App = () => {

  const dispatch = useDispatch();

  const rockets = useSelector((state:any)=>state.rockets);
  const selectedRocket = useSelector((state:any)=>state.selectedRocket);

  console.log("ROCKETS>>");

  console.log(rockets);
  
  React.useEffect(()=>{
    //call api to get the 
    console.log("Get Rockets..");
    
    fetch(rocketEndpoint + "/api/rocket/")
      .then(res=>res.json())
      .then((data) =>{
      dispatch(setRockets(data));
    });
    
  }, []);

  
  const rocketSelected = (id: number)=>{
    console.log("Rocekt..");
    const selectedRocket = rockets.find((r:any)=>r.id==id);
    dispatch(setSelectedRocket(selectedRocket));

    fetch(rocketEndpoint + "/api/position/rocket/" + selectedRocket.id + "/")
    .then(res=>res.json())
      .then((data) =>{
        console.log("Position;:::");
        
      console.log(data);
    });
  };

  
  return (
    <RLLayout>
      <div className="relative text-clifford flex flex-col w-full h-full overflow-hidden">

        <div className="flex m-5">

          <SpacecraftSelect rockets={rockets} onRocketSelect={rocketSelected}/>

          {selectedRocket?

            <div className="flex flex-col">

              <h1 className="text-red-500 ml-10">{selectedRocket.mission}</h1>
              <h3>{selectedRocket.launch_date}</h3>
              <div>Current Position: {selectedRocket.currentPos.X}, {selectedRocket.currentPos.Y}, {selectedRocket.currentPos.Z} </div>
            </div>
          :null}

        </div>

      
    
      </div>
    </RLLayout>
  );
}

export default App;
