import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: null as AppUser | null,
  reducers: {
    addUser: (_state, action: PayloadAction<AppUser>) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
