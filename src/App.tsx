import React from 'react';
import RLLayout from './components/RLLayout';
import SpacecraftSelect from './components/SpacecraftSelect';
import { useDispatch, useSelector } from 'react-redux';
import { Rocket, setRockets } from './redux/slices/rocketsSlice';
import { rocketEndpoint } from './endpoints';
import { setSelectedRocket } from './redux/slices/selectedRocketSlice';
import { setSelectedPositions } from './redux/slices/selectedPositionsSlice';
import { setSelectedVelocities } from './redux/slices/selectedVelocitiesSlice';
import { setSelectedAccelerations } from './redux/slices/selectedAccelerationsSlice';

import RocketData from './components/RocketData';
import RocketPlot from './components/RocketPlot';
import DataTimer from './components/DataTimer';

import runRocketSim from './rocketSim';

const  App = () => {
  const [dataResetTimerTrigger, setDataResetTimerTrigger] = React.useState(0);
  const dispatch = useDispatch();

  const rockets = useSelector((state:any)=>state.rockets);
  const selectedRocket:Rocket = useSelector((state:any)=>state.selectedRocket);

  const positions = useSelector((state:any)=>state.positions);
  const velocities = useSelector((state:any)=>state.velocities);
  const accelerations = useSelector((state:any)=>state.accelerations);

  const [simStarted, setSimStarted] = React.useState(false);

  const [dimensions, setDimensions] = React.useState({ 
      height: window.innerHeight,
      width: window.innerWidth
  });
  
  
  React.useEffect(()=>{
    loadRocketData();
    const handleResize = ()=>{
        setTimeout(()=>{
          setDimensions({
              height: window.innerHeight,
              width: window.innerWidth
          });
        },100);
    }
    
    window.addEventListener('resize', handleResize)

    const handleKeyPress = ()=>{
       if(selectedRocket){
          loadKinematicData(selectedRocket);
       }
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keypress', handleKeyPress);
    };
      
  }, [selectedRocket, dataResetTimerTrigger]);

  const loadRocketData = ()=>{
    fetch(rocketEndpoint + "/api/rocket/")
      .then(res=>res.json())
      .then((data) =>{
      dispatch(setRockets(data));
    });
  };
  const loadKinematicData = (rocketSelect: Rocket) =>{
 
    fetch(rocketEndpoint + "/api/position/rocket/" + rocketSelect.id + "/")
    .then(res=>res.json())
      .then((data) =>{
        
      
      dispatch(setSelectedPositions(data));
    });

    fetch(rocketEndpoint + "/api/velocity/rocket/" + rocketSelect.id + "/")
    .then(res=>res.json())
      .then((data) =>{
        
      
      dispatch(setSelectedVelocities(data));
    });

    fetch(rocketEndpoint + "/api/acceleration/rocket/" + rocketSelect.id + "/")
    .then(res=>res.json())
      .then((data) =>{
        
      
      dispatch(setSelectedAccelerations(data));
      
      
      
      setDataResetTimerTrigger((dataResetTimerTrigger+1));
    });
    
  };

  const reloadData = ()=>{
    if(selectedRocket){
      loadRocketData();
      loadKinematicData(selectedRocket);
    }
  };
  
  const rocketSelected = (id: number)=>{
    setSimStarted(false);
    const rocketSelect = rockets.find((r:any)=>r.id==id);
    dispatch(setSelectedRocket(rocketSelect));
    loadKinematicData(rocketSelect);
  };

  const getChartWidth = ()=>{
    const width = Math.round(dimensions.width/3.4);
    return width < 250 ? "80%" : width + "px";
  };
 
  const clearData = () =>{
    fetch(rocketEndpoint + "/api/rocket/" +selectedRocket.id+ "/data/", {method: 'DELETE'});
    setTimeout(()=>{
      loadKinematicData(selectedRocket);
    },500);
  };

  const runSim = async () =>{
    setSimStarted(true);
    clearData();
    await runRocketSim(selectedRocket.id);
  };


  let activeRocket = null;
  if(selectedRocket){
    activeRocket = rockets.find((r:any)=>r.id==selectedRocket.id);
  }

  return (
    <RLLayout>
      <div className="relative text-clifford flex flex-col w-full h-full">

        <div className="flex ml-5 mt-5 mr-5 flex-wrap">

          <SpacecraftSelect rockets={rockets} onRocketSelect={rocketSelected}/>

          {activeRocket?
            <>
              <RocketData selectedRocket={activeRocket} />
              <div className="self-center">
                <DataTimer  doReset={dataResetTimerTrigger} doAction={reloadData}/>
              </div>
            </>
          :null}

        </div>
        

        {activeRocket?
       
          <div className="flex items-center justify-between grow m-5 flex-wrap overflow-auto scrollbar-custom">
            <div className={`flex jusify-between m-2 w-[${getChartWidth()}]`}>
              <RocketPlot data={positions} title={"Position"} isPos/>
            </div>
            <div className={`flex jusify-between m-2 w-[${getChartWidth()}]`}>
              <RocketPlot data={velocities} title={"Velocity"} isVel/>
            </div>
            <div className={`flex jusify-between m-2 w-[${getChartWidth()}]`}>
              <RocketPlot data={accelerations} title={"Acceleration"} isAccl/>
            </div>
          </div>
        :null}

      {activeRocket?
        <div className="flex justify-between">

            <button
                onClick={()=>{clearData();}} 
                disabled={simStarted}
                className={`py-1 px-3 m-5 rounded-full text-white bg-clifford hover:bg-red-500`}>
                  <span>Clear Data</span>
            </button>
            <button
                onClick={()=>{runSim();}} 
                disabled={simStarted}
                className={`py-1 px-3 m-5 rounded-full ${simStarted ? "text-gray bg-black cursor-default" : "text-white bg-clifford hover:bg-red-500 "}`}>
                {!simStarted ? 
                  <span>Run Sim</span>
                  : 
                  <span>Sim Running</span>
                }
            </button>
        </div> 
     :null}
    
      </div>
    </RLLayout>
  );
}

export default App;
