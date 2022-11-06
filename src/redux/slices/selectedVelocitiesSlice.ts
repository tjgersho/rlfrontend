import { createSlice } from '@reduxjs/toolkit'

import { Velocity } from './rocketsSlice';

// Define a type for the slice state
type SelectedVelocitiesState = Velocity[];
// Define the initial state using that type
const initialState: SelectedVelocitiesState = [];

export const selectedVelocitiesSlice = createSlice({
  name: 'selectedVelocities',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedVelocities: (state, action) => {
        return action.payload;
    } 
  },
})

export const { setSelectedVelocities } = selectedVelocitiesSlice.actions

export default selectedVelocitiesSlice.reducer