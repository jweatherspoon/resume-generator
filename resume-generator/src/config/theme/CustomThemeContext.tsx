import { Theme } from '@mui/material/styles';
import React from "react";
import { defaultTheme } from "./default-theme";

const CustomThemeContext = React.createContext({
    theme: defaultTheme,
    setTheme: (_newTheme: Theme) => {}
});

export default CustomThemeContext;