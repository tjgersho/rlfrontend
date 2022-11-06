import { rocketEndpoint } from './endpoints';
import { Acceleration, Position, Velocity } from './redux/slices/rocketsSlice';
 
export const nextVelocity = (accel:Acceleration, velocity: Velocity, dt: number) : Velocity => {
    const nextVel : Velocity = {
        Vx:  velocity.Vx  +  accel.Ax*dt,
        Vy:  velocity.Vy  +  accel.Ay*dt,
        Vz:  velocity.Vz  +  accel.Az*dt,
        created: velocity.created + dt,
        rocket: velocity.rocket
    }
    return nextVel;
};
 
export const nextPosition = (accel:Acceleration, velocity: Velocity, position: Position, dt: number) : Position => {
    const nextPos : Position = {
        X: position.X + velocity.Vx * dt + 0.5*accel.Ax*dt*dt,
        Y: position.Y + velocity.Vy * dt + 0.5*accel.Ay*dt*dt,
        Z: position.Z + velocity.Vz * dt + 0.5*accel.Az*dt*dt,
        created: position.created + dt,
        rocket: position.rocket
    }
    return nextPos;
};

export const runRocketSim = async (id: number) =>{
    const simTime:number = 100;

    const now = Date.now() / 1000;
    
    
    
    
    let initialPosition: Position = {
        X: 0,
        Y: 0,
        Z: 0,
        created: now,
        rocket: id
    };

    const initialVel: Velocity = {
        Vx: 0,
        Vy: 0,
        Vz: 0,
        created: now,
        rocket: id
    };

    const initialAccel: Acceleration = {
            Ax: 1,
            Ay: 0.1,
            Az: 0.2,
            created: now,
            rocket: id
    };

    let calculatedPositions: Position[] = [];
    let nextPos =  initialPosition;
    let nextVel = initialVel;
    calculatedPositions.push(nextPos);

    for(let i=1; i<simTime; i++){
        nextPos = nextPosition(initialAccel, nextVel, nextPos, 1);
        nextVel = nextVelocity(initialAccel, nextVel, 1);
        calculatedPositions.push(nextPos);
    }

    for(let i=0; i<simTime; i++){
        var calcPos = calculatedPositions[i];
 
        setTimeout(()=>{
            fetch(rocketEndpoint + "/api/position/", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(calculatedPositions[i]) // body data type must match "Content-Type" header
            });
        },  1000* i);
    }
    
};



export default runRocketSim;