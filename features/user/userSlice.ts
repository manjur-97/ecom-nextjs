// features/user/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; 

interface UserData {
  id: number;
  username: string;
  mobile_no: string;
  email?: string;
}

interface UserState {
  isAuthenticated: boolean;
  username: string | null;
  userId: number | null;
  mobileNo: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: null,
  userId: null,
  mobileNo: null,
  email: null,
  loading: false,
  error: null,
};

// Fetch current authenticated user
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('current-user');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user info'
      );
    }
  }
);



// Logout
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/logout'); // Backend logout endpoint
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Manual login (if needed)
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.userId = action.payload.id;
      state.mobileNo = action.payload.mobile_no;
      state.email = action.payload.email || null;
      state.error = null;
    },
    // Manual logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.userId = null;
      state.mobileNo = null;
      state.email = null;
      state.error = null;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.userId = action.payload.id;
        state.mobileNo = action.payload.mobile_no;
        state.email = action.payload.email || null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.userId = null;
        state.mobileNo = null;
        state.email = null;
        state.error = action.payload as string;
      });



    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.userId = null;
        state.mobileNo = null;
        state.email = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { login, logout, clearError } = userSlice.actions;
export default userSlice.reducer;