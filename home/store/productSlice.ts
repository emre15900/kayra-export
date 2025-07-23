import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types/product'

interface ProductState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setProducts, setLoading, setError } = productSlice.actions
export default productSlice.reducer