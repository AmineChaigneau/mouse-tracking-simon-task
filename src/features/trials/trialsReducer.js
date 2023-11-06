// slices/calibrationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trials_completed: [],
    trials: [],
    trialIndex: 0,
    session: 1,
    subject_id: Math.floor(Math.random() * 100000),
};

const trialsSlice = createSlice({
    name: 'trials',
    initialState,
    reducers: {
        addCompletedTrial(state, action) {
            state.trials_completed.push(action.payload);
        },
        setTrialsSequence(state, action) {
            state.trials = action.payload;
        },
        incrementTrialIndex(state, action) {
            console.log(state)
            state.trialIndex += 1;
        },
        resetTrialIndex(state) { 
            state.trialIndex = 0;
        },
        incrementSession(state) {
            state.session += 1;
        },
        resetTrials: () => initialState,
    },
});

export const { addCompletedTrial, setTrialsSequence, incrementTrialIndex, resetTrialIndex, incrementSession, resetTrials } = trialsSlice.actions;
export default trialsSlice.reducer;