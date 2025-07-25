import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice'

const createStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

let store: any

function initStore() {
  return configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

if (typeof window === 'undefined') {
  store = initStore()
} else {
  // Create store if unavailable on client side
  if (!(window as any).__REDUX_STORE__) {
    (window as any).__REDUX_STORE__ = initStore()
  }
  store = (window as any).__REDUX_STORE__
}

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch