import { createTheme } from "@mui/material/styles";
import themesOptions, { baseOptions } from "./option";
import _ from "lodash";

export const createAppTheme = (config = {}) => {
  let themeOption = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOption) {
    themeOption = themesOptions[0];
  }
  const theme = createTheme(
    _.merge({}, baseOptions, themeOption, { direction: config.direction })
  );
  return theme;
};

const theme = createAppTheme();
export default theme;
