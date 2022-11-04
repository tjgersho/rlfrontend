import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../reduxhooks'

import { decrement, increment } from '../redux/slices/counterSlice'

export default function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => {
    console.log("State?");
    console.log(state);
    return state.counter.value;
  })
  const dispatch = useAppDispatch()

  return <div>Count: {count}  <button onClick={()=>{dispatch(increment())}}>Increment</button></div>
}