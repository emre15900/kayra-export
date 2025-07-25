import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

let store: any

const createStore = () => configureStore({
  reducer: {
    cart: cartReducer,
  },
})

if (typeof window === 'undefined') {
  store = createStore()
} else {
  // Create store if unavailable on client side
  if (!store) {
    store = createStore()
  }
}

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch