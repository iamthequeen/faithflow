import { Box, Grid, Typography, useTheme, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../utils/UserContext";
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS } from "../../utils/formSteps";
import { auth } from "../../utils/firebaseSetup";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";


function LoginForm() {

const theme = useTheme()

const {
login, hasDoneNewUserFormBefore,
  } = useContext(UserContext);

        const { formStep, setFormStep } = useContext(FormStepContext)



  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const location = useLocation()
const navigate = useNavigate()

    const onSubmit = async (data) => {

        try {
            await login(data.email, data.password)
        alert ("Successfully logged in")
        navigate("/myhome")
        } catch (error) {
        console.error(error)
        alert ("Login failed:", error);
      }
    }

    
 
  return (
    <>
    {location.pathname === "/login" && <Header/>}
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
        >Log into account</Typography>
    <Box component="form" sx={{
           '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit(onSubmit)}
       >
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>

<Grid item>
<Typography variant="h6" component="h2" sx={{
    fontWeight: 400,
}}>Please enter your info.</Typography>
</Grid>

        <Grid item xs={6} md={8}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email is Required",
                },
                pattern: {
                  value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                  message: "Email is Invalid",
                },
              }}
              // get the field state
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                id="email" label="Email"
                sx={{
                    [theme.breakpoints.down("sm")]: {
    width: "17rem",
  },
                }}
                  {...field}
                  required
                  //  is error ??
                  error={errors.email ? true : false}
                  // show helper text if it is invalid
                />
              )}
            />
            <Typography variant="body2" color="textSecondary">
              {errors.email?.message}
            </Typography>
          </Grid>

          <Grid item xs={6} md={8}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "Password is Required",
                }
              }}
              // get the field state
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                id="password" label="Password" 
                type="password"
                sx={{
                    [theme.breakpoints.down("sm")]: {
    width: "17rem",
  },
                }}
                  {...field}
                  required
                  //  is error ??
                  error={errors.password ? true : false}
                  // show helper text if it is invalid
                />
              )}
            />
            <Typography variant="body2" color="textSecondary">
              {errors.password?.message}
            </Typography>
          </Grid>


          <Grid item>
            <Button 
            sx={{
              bgcolor: theme.palette.darkBluePrimary.main,
            }}
            type="submit">
              Log In
            </Button>
          </Grid>

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
      </Grid>
      </Box>
    </Box>
    </>
  );
}

export default LoginForm;
