import { configureStore } from '@reduxjs/toolkit'
//import RocketReducer from './redux/reducers/RocketReducer';
import Counter from './slices/counterSlice';
import rocketsSlice from './slices/rocketsSlice';
import selectedRocketSlice from './slices/selectedRocketSlice';
const store = configureStore({
  reducer: {
    rockets: rocketsSlice,
    counter: Counter,
    selectedRocket: selectedRocketSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;