import { Box, Grid, Typography, useTheme, Button, TextField, ButtonGroup } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS } from "../../utils/formSteps";


function SaveProgressPage() {

    const theme = useTheme()


    const { setFormStep } = useContext(FormStepContext)


   
 
  return (
    <Box component="main" 
    sx={{
      paddingTop: "1.5rem",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      background: `linear-gradient(44.1deg, ${theme.palette.whitePrimary.main} 36.52%, ${theme.palette.bluePrimary.main} 68.57%)`,
    }}
    >
    <Typography 
        component="h1"
        variant="h4"
        sx={{
          color: "#655FB1",
    padding: "0.5rem 0",
    fontWeight: 800,
    fontFamily: "serif",
        }}
        >Become a better you.</Typography>

<Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>

<Grid item>
<Typography variant="h6" component="h1" sx={{
    fontWeight: 400,
}}>If you'd like to save your progress, please create an account!</Typography>
</Grid>

<Grid item>


<ButtonGroup orientation="vertical" size="large" variant="contained"
sx={{
    boxShadow: "none"
}}
>
<Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
<Grid item>
    <Button variant="contained" startIcon={<FontAwesomeIcon icon={faUser} />} color="lightBlueSecondary"
    onClick={() => {
        setFormStep(STEPS.SIGN_UP)
    }}
    >
  Create an account
</Button>
    </Grid>

    <Grid item>
    <Button color="darkGraySecondary"
    onClick={() => {
        setFormStep(STEPS.HOME)
    }}
    >
    No thanks
    </Button>
    </Grid>
    </Grid>
</ButtonGroup>
</Grid>

</Grid>
    </Box>
  );
}

export default SaveProgressPage;
