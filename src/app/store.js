import { configureStore } from '@reduxjs/toolkit'
import utilsReducer from '../features/utils/utilsReducer'
import formReducer from '../features/form/formReducer'
import calibrationReducer from '../features/calibration/calibrationReducer'
import trialsReducer from '../features/trials/trialsReducer'
import trainingReducer from '../features/training/trainingReducer'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { resetUtils } from '../features/utils/utilsReducer'
import { resetTraining } from '../features/training/trainingReducer'
import { resetCalibration } from '../features/calibration/calibrationReducer'
import { resetTrials } from '../features/trials/trialsReducer'
import { resetForm } from '../features/form/formReducer'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

// export const store = configureStore({
//     reducer: {
//         utils: utilsReducer,
//         form: formReducer,
//         calibration: calibrationReducer,
//         trials: trialsReducer,
//         training: trainingReducer,
//     }
// })

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    utils: utilsReducer,
    form: formReducer,
    calibration: calibrationReducer,
    trials: trialsReducer,
    training: trainingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const resetStore = () => (dispatch) => {
    dispatch(resetUtils());
    dispatch(resetTraining());
    dispatch(resetTrials());
    dispatch(resetCalibration());
    dispatch(resetForm());
};

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export default store;