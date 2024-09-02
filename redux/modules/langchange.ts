import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LangState } from "../interface";
const initialState: LangState = {
  lang: "zh",
};
export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<LangState>) => {
      const { lang } = action.payload;
      state.lang = lang;
    },
  },
});
export const { changeLang } = langSlice.actions;
export default langSlice.reducer;
