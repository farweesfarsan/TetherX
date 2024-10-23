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
    // Add the reducer for updating balanceUSD
    updateBalanceUSD: (state, action) => {
      if (state.user) {
        state.user.balanceUSD = action.payload; // Update balanceUSD in user data
      }
    },
  },
});

export const { SetWalletData, SetUser, updateBalanceUSD } = usersSlice.actions;
export default usersSlice.reducer;