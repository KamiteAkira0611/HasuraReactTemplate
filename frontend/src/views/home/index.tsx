import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import useSettings from "src/common/hooks/useSettings";
import { THEMES } from "src/common/libs/mui/option";

const HomeView = () => {
  const { saveSettings } = useSettings();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <h1>Welcome React Template</h1>
        <p>MUIv5 + react-router</p>
        <div>
          <Button
            onClick={() =>
              saveSettings({
                theme: THEMES.DARK,
              })
            }
          >
            DARK
          </Button>
          <Button
            onClick={() =>
              saveSettings({
                theme: THEMES.LIGHT,
              })
            }
          >
            LIGHT
          </Button>
        </div>
        <div>
          <Button component={Link} to="/auth/login" variant="contained">
            login
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default HomeView;
