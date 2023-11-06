import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info_player: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateInfoPlayer: (state, action) => {
      state.info_player = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { updateInfoPlayer, resetForm } = formSlice.actions;

export default formSlice.reducer;
