import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "@/redux/interface/index";

const initialState: ThemeState = {
  mode: "light",
  userChoose: false,
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<ThemeState>) => {
      const { mode, userChoose = false } = action.payload;
      state.mode = mode;
      state.userChoose = userChoose;
    },
  },
});
export const { changeMode } = themeSlice.actions;

export default themeSlice.reducer;
