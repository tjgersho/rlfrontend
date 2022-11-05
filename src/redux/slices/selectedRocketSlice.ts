import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 


// Define a type for the slice state
type SelectedRocketState = {
    index: number;  
} | null;

// Define the initial state using that type
const initialState: SelectedRocketState = null;

export const selectedRocketSlice = createSlice({
  name: 'selectedRocket',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedRocket: (state, action) => {
        state = action.payload;
    } 
  },
})

export const { setSelectedRocket } = selectedRocketSlice.actions

export default selectedRocketSlice.reducer