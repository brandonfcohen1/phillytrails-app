import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/RouteBuilder/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})