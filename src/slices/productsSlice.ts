import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalProducts: number;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalProducts: 0,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log("Fetched products:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

export const createProduct = createAsyncThunk<Product, Omit<Product, "id">>(
  "products/createProduct",
  async (newProduct, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        newProduct
      );
      console.log("Created product:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create product");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("Fulfilled products:", action.payload);
        state.loading = false;
        state.products = action.payload;
        state.totalProducts = action.payload.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch products";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products.push(action.payload);
        state.totalProducts += 1;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create product";
      });
  },
});

export const { setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;
