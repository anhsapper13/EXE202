import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface ThemeState {
  mode: "light" | "dark";
  fontSize: "small" | "medium" | "large";
  animations: boolean;
}

// detect the user's system theme preference
const getInitialTheme = (): "light" | "dark" => {
  try {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      console.log("Saved theme from localStorage:", savedTheme); // Debug log
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem("theme", "light");
        return "dark";
      }
      localStorage.setItem("theme", "light");
      return "light";
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
  return "light";
};
const initialState: ThemeState = {
  mode: getInitialTheme(),
  fontSize: "medium",
  animations: true,
};

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    setFontSize: (
      state,
      action: PayloadAction<"small" | "medium" | "large">
    ) => {
      state.fontSize = action.payload;
    },
    toggleAnimations: (state) => {
      state.animations = !state.animations;
    },
    setAnimations: (state, action: PayloadAction<boolean>) => {
      state.animations = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setFontSize,
  toggleAnimations,
  setAnimations,
} = themeSlice.actions;

export default themeSlice;
