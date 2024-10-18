import { configureStore } from "@reduxjs/toolkit";
import usersReducers from './usersSlice';
import loadersReducers from './loadersSlice'; // Import loadersSlice

const store = configureStore({
  reducer: {
    users: usersReducers,
    loader: loadersReducers, // Add loadersSlice to store
  }
});

export default store;