import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    value: [],
  },
  reducers: {
    addFavorites: (state, action) => {
    //   state.value = [...state.value];
      state.value = state.value.concat(action.payload);
    },
  },
});

// Actions
export const { addFavorites } = favoritesSlice.actions;
export const favMovies = (state) => state.favorites.value;
export default favoritesSlice.reducer;
