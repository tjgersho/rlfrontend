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
                <span>Position:</span> <span>{selectedRocket.currentPos.X}, {selectedRocket.currentPos.Y}, {selectedRocket.currentPos.Z}</span>
                </div>
            <div className="flex justify-between">
                <span>Velocity:</span> 
                <span>{selectedRocket.currentVel.Vx}, {selectedRocket.currentVel.Vy}, {selectedRocket.currentVel.Vz}</span>
                </div>
            <div className="flex justify-between">
                <span>Acceleration: </span> 
                <span>{selectedRocket.currentAccel.Ax}, {selectedRocket.currentAccel.Ay}, {selectedRocket.currentAccel.Az}</span>
            </div>
            </div>
        </div>

    )

};

export default RocketData;