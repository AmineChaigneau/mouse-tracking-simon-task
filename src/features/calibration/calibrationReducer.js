// slices/calibrationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trials: [],
    trialCount: 0
};

const calibrationSlice = createSlice({
    name: 'calibration',
    initialState,
    reducers: {
        addTrial(state, action) {
            state.trials.push(action.payload);
        },
        resetTrialCount(state) { 
            state.trialCount = 0;
        },
        incrementTrialCount(state) {
            state.trialCount += 1;
        },
        resetCalibration: () => initialState,
    },
});

export const { addTrial, resetTrialCount, incrementTrialCount, resetCalibration } = calibrationSlice.actions;
export default calibrationSlice.reducer;
