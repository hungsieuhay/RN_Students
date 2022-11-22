import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentApi from '../../api/studentApi';

const initialState = {
  studentList: [],
  isLoading: false,
  hasError: false,
  isAdd: true,
  studentUpdated: { id: '', avatar: '', name: '', age: null, email: '' },
};

export const getStudents = createAsyncThunk('student/getStudents', async () => {
  try {
    const response = await studentApi.getAll();
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      return { ...state, studentList: [action.payload, ...state.studentList] };
    },
    editStudent: (state, action) => {
      return { ...state, isAdd: false, studentUpdated: action.payload };
    },
    updateStudent: (state, action) => {
      const list = state.studentList.map((student) => {
        if (student.id === action.payload.id) {
          return { ...action.payload };
        }
        return student;
      });
      return {
        ...state,
        studentList: [...list],
        isAdd: true,
      };
    },
    goToStudentAddMode: (state) => {
      return { ...state, isAdd: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.studentList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getStudents.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const { addStudent, editStudent, updateStudent, goToStudentAddMode } = studentSlice.actions;

export default studentSlice.reducer;
