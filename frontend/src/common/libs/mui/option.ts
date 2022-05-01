import { colors } from "@mui/material";
import typography from "./typography";

export const THEMES = {
  DARK: "DARK",
  LIGHT: "LIGHT",
};

export const baseOptions = {
  direction: "ltr",
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)",
      },
    },
  },
};

const themesOptions = [
  {
    name: THEMES.DARK,
    palette: {
      mode: "dark",
      action: {
        active: "rgba(255, 255, 255, 0.54)",
        hover: "rgba(255, 255, 255, 0.04)",
        selected: "rgba(255, 255, 255, 0.08)",
        disabled: "rgba(255, 255, 255, 0.26)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        default: "#1c2025",
        dark: "#1c2025",
        paper: "#282C34",
      },
      primary: {
        main: "#8a85ff",
      },
      secondary: {
        main: "#8a85ff",
      },
      text: {
        primary: "#e6e5e8",
        secondary: "#adb0bb",
      },
    },
  },
  {
    name: THEMES.LIGHT,
    palette: {
      mode: "light",
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: "#f4f6f8",
        dark: "#f4f6f8",
        paper: colors.common.white,
      },
      primary: {
        main: colors.indigo[600],
      },
      secondary: {
        main: "#5850EC",
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    typography: {},
  },
];

export default themesOptions;
