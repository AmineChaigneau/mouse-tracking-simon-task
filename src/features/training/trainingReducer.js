// slices/trainingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trainings: [],
    trainingIndex: 0,
};

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setTrainingSequence(state, action) {
            state.trainings = action.payload;
        },
        updateTrainingIndex(state, action) {
            const newValue = Number(action.payload);
            if (!Number.isNaN(newValue)) {
                state.trainingIndex = newValue;
            } else {
                console.warn('Payload is not a number, cannot update trainingIndex');
            }
        },
        incrementTrainingIndex(state) {
            console.log(state)
            state.trainingIndex += 1;
        },
        resetTrainingIndex(state) {
            state.trainingIndex = 0;
        },
        resetTraining: () => initialState,
    },
});

export const { setTrainingSequence, incrementTrainingIndex, resetTrainingIndex, updateTrainingIndex, resetTraining } = trainingSlice.actions;
export default trainingSlice.reducer;