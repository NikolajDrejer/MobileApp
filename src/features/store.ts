import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import searchReducer from './searchParams'
import algoliaSlice  from './datas'
const store = configureStore({
    reducer: {
      user: userReducer,
      search: searchReducer,
      algolia: algoliaSlice,
    }
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store