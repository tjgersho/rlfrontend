import React from 'react';
import { Rocket } from '../redux/slices/rocketsSlice';

interface RocketDataProps {
    selectedRocket: Rocket
}

const RocketData = (props: RocketDataProps) =>{
    const {selectedRocket}  = props;
    return (

        <div className="flex mx-3 flex-wrap justify-between grow">
            <h1 className="text-xl min-w-150 mx-3">{selectedRocket.mission}</h1>
            <h3 className="flex mx-3">{new Date(selectedRocket.launch_date).toLocaleDateString()} {new Date(selectedRocket.launch_date).toLocaleTimeString()}</h3>
            <div className="flex flex-col min-w-150">
            <div className="flex justify-between w-[400px]">
            {selectedRocket.currentPos ?
               <> 
               <span>Position:</span> 
               <span>{selectedRocket.currentPos.X.toFixed(2)}, {selectedRocket.currentPos.Y.toFixed(2)}, {selectedRocket.currentPos.Z.toFixed(2)}</span>
               </>
            :null}    
            </div>
            <div className="flex justify-between">
            {selectedRocket.currentVel ?
                <>
                <span>Velocity:</span> 
                <span>{selectedRocket.currentVel.Vx.toFixed(2)}, {selectedRocket.currentVel.Vy.toFixed(2)}, {selectedRocket.currentVel.Vz.toFixed(2)}</span>
                </>
            :null}   
            </div>
            <div className="flex justify-between">
            {selectedRocket.currentAccel ?
                <>
                <span>Acceleration: </span> 
                <span>{selectedRocket.currentAccel.Ax.toFixed(2)}, {selectedRocket.currentAccel.Ay.toFixed(2)}, {selectedRocket.currentAccel.Az.toFixed(2)}</span>
                </>
            :null}   
            </div>
            </div>
        </div>

    )

};

export default RocketData;