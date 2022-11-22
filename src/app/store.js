import { combineReducers, configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/student/studentSlice';
import subjectReducer from '../features/subject/subjectSlice';

const rootReducer = combineReducers({
  student: studentReducer,
  subject: subjectReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
