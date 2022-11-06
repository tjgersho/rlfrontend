import { createSlice } from '@reduxjs/toolkit'

import { Acceleration} from './rocketsSlice';

// Define a type for the slice state
type SelectedAccelerationsState = Acceleration[];
// Define the initial state using that type
const initialState: SelectedAccelerationsState = [];

export const selectedAccelerationsSlice = createSlice({
  name: 'selectedAccelerations',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedAccelerations: (state, action) => {
        return action.payload;
    } 
  },
})

export const { setSelectedAccelerations } = selectedAccelerationsSlice.actions

export default selectedAccelerationsSlice.reducer