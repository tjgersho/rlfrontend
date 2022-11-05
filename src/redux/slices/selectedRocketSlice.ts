import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import rocketsSlice from './rocketsSlice';
 

import {Rocket} from './rocketsSlice';

// Define a type for the slice state
type SelectedRocketState = Rocket | null;
 
// Define the initial state using that type
const initialState: SelectedRocketState = null;

export const selectedRocketSlice = createSlice({
  name: 'selectedRocket',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedRocket: (state, action) => {
        return action.payload;
    } 
  },
})

export const { setSelectedRocket } = selectedRocketSlice.actions

export default selectedRocketSlice.reducer