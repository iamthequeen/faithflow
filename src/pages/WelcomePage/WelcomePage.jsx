import { Box, Grid, Typography, useTheme, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FormStepContext } from "../../utils/FormStepContext";
import { useNavigate } from "react-router-dom";
import { STEPS } from "../../utils/formSteps";
import { UserContext } from "../../utils/UserContext";


function WelcomePage() {

    const { setFormStep } = useContext(FormStepContext)

     const { setMyHabits, setPersonalStruggles, setPersonalImprovements } = useContext(UserContext)

useEffect(() => {
    window.scrollTo(0,0)
})

const resetData = () => {
setMyHabits([])
        setPersonalStruggles([])
        setPersonalImprovements([])
}

 useEffect(() => {
        resetData()
    }, [])

const theme = useTheme()

const navigate = useNavigate()
 
  return (
    <Box component="main" 
    sx={{
      paddingTop: "6rem",
      minHeight: "100vh",
      display: "flex",
      textAlign: "center",
      background: `linear-gradient(44.1deg, ${theme.palette.whitePrimary.main} 36.52%, ${theme.palette.bluePrimary.main} 68.57%)`,
    }}
    >
    <Grid container direction="column" justifyContent="center" >

        <Grid item>
        <Typography 
         component="p"
        variant="h2"
        sx={{
          color: "#655FB1",
    	WebkitTextStroke: `0.5px ${theme.palette.whitePrimary.main}`,
    padding: "0.5rem 0",
    fontWeight: 800,
    fontFamily: "serif",
    [theme.breakpoints.down("sm")]: {
        fontSize: "3rem",
    }
        }}
        >faithflow</Typography>
     
      <Box 
      sx={{
        margin: "auto",
    position: "relative",
    maxWidth: "27rem",

      }}
      >
      <Typography component="p" variant="h6"  
      sx={{
        padding: "1rem 0",
        // margin: "0 15px",
        color: theme.palette.blackPrimary.main,
      }}
      >
        Thank you for choosing the FaithFlow Christian Habit Tracker to help you build better habits and grow in your faith!
      </Typography>
      <Typography component="p" variant="h6" 
      sx={{
        // margin: "0 30px",
        color: theme.palette.blackPrimary.main,
      }}
      >
      Remember, <Typography component="span" variant="h6" 
      sx={{
        textDecoration: "underline"
      }}
      >every small step</Typography> counts towards achieving your goals.
      </Typography>
      <Typography variant="body1" 
      sx={{
        padding: "1rem 0",
        margin: "0 30px",
        color: theme.palette.darkGrayPrimary.main,
        fontWeight: "bold",
      }}
      >
      'Commit your actions to the Lord, and your plans will succeed.' - Proverbs 16:3
      </Typography>
      </Box>
      </Grid>
      
      <Grid item>
      <Button
      sx={{
        borderRadius: "14px",
        backgroundColor: theme.palette.darkBluePrimary.main,
      }}

      onClick={() => {
        window.scrollTo(0,0)
        setFormStep(STEPS.STRUGGLES)
      }}
      >
      Start Journey
      </Button>
      </Grid>

       <Grid item>
      <Button variant="text"
          sx={{
            "&:hover": {
                textDecoration: "underline",
            }
          }}

          onClick={() => {
            window.scrollTo(0,0)
        navigate("/login")
      }}
          >Already completed this before? Login</Button>
      </Grid>

    {/* 
    <Grid item>
          { formStep === STEPS.LOG_IN ? <Button variant="text"
          sx={{
            "&:hover": {
                textDecoration: "underline",
            }

          }}
onClick={() => {
        setFormStep(STEPS.SIGN_UP)
      }}
          
          >Don't have an account? Sign Up!</Button> :
          <Button variant="text"
          sx={{
            "&:hover": {
                textDecoration: "underline",
            }

          }}
onClick={() => {
  if (location.pathname === "/login") {
    navigate("/newuser")
  }
    }}
          
          >Don't have an account? Proceed to the new user page!</Button>
          }
          </Grid>
    */}

      </Grid>
    </Box>
  );
}

export default WelcomePage;
