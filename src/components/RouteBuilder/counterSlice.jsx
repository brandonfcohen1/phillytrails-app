import { createSlice } from '@reduxjs/toolkit';


export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    route: {type: "Feature", geometry: {type: "LineString", coordinates: []}}
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload.routes[0].distance * 6.214e-4
      const coord = action.payload.routes[0].geometry.coordinates
      for (var i = 0; i < coord.length; i++) {
        state.route.geometry.coordinates.push(coord[i])
      }
      
    },
    reset: (state) => {
      state.value = 0
    }
  }, 
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

export default counterSlice.reducer