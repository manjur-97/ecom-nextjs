import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  username: string | null;
}

let initialState: UserState = {
  isAuthenticated: false,
  username: null,
};

if (typeof window !== "undefined") {
  const user = localStorage.getItem("userAuth");
  if (user) {
    const { username } = JSON.parse(user);
    initialState = {
      isAuthenticated: true,
      username,
    };
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

