import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  subjectList: [],
  isLoading: false,
  hasError: false,
  isAdd: true,
  subjectUpdated: {
    id: '',
    subjectName: '',
    teacher: '',
    classRoom: '',
    students: [],
    isRegister: false,
  },
};

export const getSubjects = createAsyncThunk('subject/getSubjects', async () => {
  try {
    const response = await axios.get('https://637b838910a6f23f7fab0611.mockapi.io/api/subjects');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    addSubject: (state, action) => {
      return { ...state, subjectList: [action.payload, ...state.subjectList] };
    },
    editSubject: (state, action) => {
      return { ...state, isAdd: false, subjectUpdated: action.payload };
    },
    updateSubject: (state, action) => {
      const list = state.subjectList.map((subject) => {
        if (subject.id === action.payload.id) {
          return { ...action.payload };
        }
        return subject;
      });
      return {
        ...state,
        subjectList: [...list],
        isAdd: true,
      };
    },
    goToSubjectAddMode: (state) => {
      return { ...state, isAdd: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.subjectList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getSubjects.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const { addSubject, editSubject, updateSubject, goToSubjectAddMode } = subjectSlice.actions;

export default subjectSlice.reducer;
