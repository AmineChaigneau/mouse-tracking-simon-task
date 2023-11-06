import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time_limit: 1500, // n * 1000, default value = 1.5s
  session: 3, // default = 3
  nb_trials: 256, // default 256
  height: 0,
  width: 0,
};

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    updateTimeLimit: (state, action) => {
      const n = action.payload;
      state.time_limit = n * 1000;
    },
    updateSessionNb: (state, action) => {
      state.session = action.payload;
    },
    updateTrialsNb: (state, action) => {
      const newValue = Number(action.payload);
      if (!Number.isNaN(newValue)) {
        state.nb_trials = newValue;
      } else {
        console.warn('Payload is not a number, cannot update trainingIndex');
      }
    },
    updateScreenSize: (state, action) => {
      state.height = action.payload.height;
      state.width = action.payload.width;
    },
    resetUtils: () => initialState,
  },
});

export const { updateTimeLimit, updateSessionNb, updateTrialsNb, resetUtils, updateScreenSize } = utilsSlice.actions;

export default utilsSlice.reducer;
