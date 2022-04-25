import React from "react";

import { Button, Typography, Grid } from "@mui/material";

function Home({ setUserType }) {
  return (
    <Grid container className="home" justify="center">
      <Grid item xs={12}>
        <Typography variant="h1">Tutor Helper</Typography>
      </Grid>

      <Grid item>
        <Button variant="contained" onClick={() => setUserType("tutor")}>
          I am the tutor
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={() => setUserType("student")}>
          I am a registered student
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => setUserType("prospector")}>
          I am a new student
        </Button>
      </Grid>
    </Grid>
  );
}

export default Home;
