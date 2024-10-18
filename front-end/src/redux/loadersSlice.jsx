import { createSlice } from '@reduxjs/toolkit';

const loadersSlice = createSlice({
    name: 'loader', // Renaming to reflect the purpose
    initialState: {
      loading: false,
    },
    reducers: {
      ShowLoading(state) {
        state.loading = true;
      },
      HideLoading(state) {
        state.loading = false;
      },
    },
  });
  
  export const { ShowLoading, HideLoading } = loadersSlice.actions;
  export default loadersSlice.reducer;