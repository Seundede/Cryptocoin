 import { configureStore } from '@reduxjs/toolkit'
 import { apiSlice  } from '../services/apiSlice'
 import { cryptoSlice } from '../services/newsSlice'

 export default configureStore({
   reducer: {
     [apiSlice.reducerPath]: apiSlice.reducer,
     [cryptoSlice.reducerPath]: cryptoSlice.reducer,
   },
 });