import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesReducer";

export default configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
