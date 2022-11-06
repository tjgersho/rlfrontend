import { configureStore } from '@reduxjs/toolkit'
//import RocketReducer from './redux/reducers/RocketReducer';

import rocketsSlice from './slices/rocketsSlice';
import selectedAccelerationsSlice from './slices/selectedAccelerationsSlice';
import selectedPositionsSlice from './slices/selectedPositionsSlice';
import selectedRocketSlice from './slices/selectedRocketSlice';
import selectedVelocitiesSlice from './slices/selectedVelocitiesSlice';


const store = configureStore({
  reducer: {
    rockets: rocketsSlice,
    selectedRocket: selectedRocketSlice,
    positions: selectedPositionsSlice,
    velocities: selectedVelocitiesSlice,
    accelerations: selectedAccelerationsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;