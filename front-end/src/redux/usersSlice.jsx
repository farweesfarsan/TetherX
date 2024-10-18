// import { createSlice } from '@reduxjs/toolkit'; // Fix the import

// const usersSlice = createSlice({ // Fix createSlice
//     name: "User",
//     initialState: {
//         user: null
//     },
//     reducers: {
//         SetUser(state, action) {
//             state.user = action.payload;
//         }
//     }
// });

// // Export the actions correctly
// export const { SetUser } = usersSlice.actions; // Fix usersSlice.actions

// // Export the reducer
// export default usersSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';


export const usersSlice = createSlice({
  name: "User",
  initialState: {
    walletData: null, // Store wallet data
    user: null, // Store user data
  },
  reducers: {
    SetUser(state, action) {
      state.user = action.payload;
    },
    SetWalletData: (state, action) => {
      state.walletData = action.payload;
    },
  },
});

export const { SetWalletData, SetUser } = usersSlice.actions;
export default usersSlice.reducer;

