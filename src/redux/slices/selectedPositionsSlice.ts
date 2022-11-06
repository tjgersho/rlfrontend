import { createSlice } from '@reduxjs/toolkit'

import { Position} from './rocketsSlice';

// Define a type for the slice state
type SelectedPositionsState = Position[];
// Define the initial state using that type
const initialState: SelectedPositionsState = [];

export const selectedPositionsSlice = createSlice({
  name: 'selectedPositions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedPositions: (state, action) => {
        return action.payload;
    } 
  },
})

export const { setSelectedPositions } = selectedPositionsSlice.actions

export default selectedPositionsSlice.reducer