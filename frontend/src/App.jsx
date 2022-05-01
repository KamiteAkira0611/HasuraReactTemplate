import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./common/contexts/FirebaseAuthContext";
import useSettings from "./common/hooks/useSettings";
import { createAppTheme } from "./common/libs/mui/theme";
import GlobalStyles from "./components/functional/GlobalStyles";
import routes, { renderRoutes } from "./router";
import CustomApolloProvider from "./common/contexts/ApolloContext";

function App() {
  const { settings } = useSettings();
  const theme = createAppTheme({
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <CustomApolloProvider>
            <CssBaseline />
            <GlobalStyles />
            {renderRoutes(routes)}
          </CustomApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
