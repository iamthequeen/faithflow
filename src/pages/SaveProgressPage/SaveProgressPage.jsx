import { Box, Grid, Typography, useTheme, Button, TextField, ButtonGroup } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS, FOOTER_STEPS } from "../../utils/formSteps";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";




function SaveProgressPage() {

    const theme = useTheme()


    const { setFormStep, setUserStep } = useContext(FormStepContext)

        const { setGuestUser } = useContext(UserContext)



   useEffect(() => {
    window.scrollTo(0,0)
})

const navigate = useNavigate()
 
  return (
    <Box component="main" 
    sx={{
    //   paddingTop: "6rem",
    //   minHeight: "100vh",
    //   display: "flex",
    paddingTop: "1.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      background: `linear-gradient(44.1deg, ${theme.palette.whitePrimary.main} 36.52%, ${theme.palette.bluePrimary.main} 68.57%)`,
    }}
    >
      <Typography 
        component="p"
        variant="h5"
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
}}>If you'd like to save your progress, 
<br/>
please create an account!</Typography>
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
        setGuestUser(true)
        navigate("/myhome")
        setUserStep(FOOTER_STEPS.HOME)
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
