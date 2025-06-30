import { toggleTheme } from "@/store/slices/themeSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import React from "react";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state: RootState) => state.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded"
    >
      {mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
