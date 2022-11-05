import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 

export interface Position {
  X: number,
  Y: number,
  Z: number,
  created: number
}

export interface Velocity {
  Vx: number,
  Vy: number,
  Vz: number,
  created: number
}

export interface Acceleration {
  Ax: number,
  Ay: number,
  Az: number,
  created: number
}

export interface Rocket {
    id: number,
    mission: string,
    launch_date: string,
    currentPos: Position,
    currentVel: Velocity,
    currentAccel: Acceleration
}

// Define a type for the slice state
type RocketsState = Rocket[];  

// Define the initial state using that type
const initialState: RocketsState = [];

export const rocketsSlice = createSlice({
  name: 'rockets',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRockets: (state, action) => {
        state = action.payload;
    } 
  },
})

export const { setRockets } = rocketsSlice.actions

export default rocketsSlice.reducer