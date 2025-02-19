import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  firstName: string;
  lastName: string;
  companyName: string;
  brandName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

const initialState: RegisterState = {
  firstName: "",
  lastName: "",
  companyName: "",
  brandName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    setBrandName: (state, action: PayloadAction<string>) => {
      state.brandName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setCompanyName,
  setBrandName,
  setEmail,
  setMobile,
  setPassword,
  setConfirmPassword,
  resetForm,
} = registerSlice.actions;

export default registerSlice.reducer;
