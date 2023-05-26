import { Box, Grid, Typography, useTheme, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../utils/UserContext";
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS } from "../../utils/formSteps";
import { updateProfile } from "firebase/auth"


function SignupForm() {

const theme = useTheme()

const {
createAccount
  } = useContext(UserContext);

      const { setFormStep } = useContext(FormStepContext)


  const {
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
        firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


    const onSubmit = async (data) => {

        try {
        // await createAccount(data.email, data.password)
        const { user } = await createAccount(data.email, data.password)
    await updateProfile(user, {
      displayName: data.name
    });
        alert ("User Created Successfully")
        // console.log("user info: ", user)
        } catch (error) {
        console.error(error)
        alert ("User creation failed:", error);
      }

      
    }
   
 
  return (
    <Box component="main" 
    sx={{
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
        component="h1"
        variant="h4"
        sx={{
          color: "#655FB1",
    padding: "0.5rem 0",
    fontWeight: 800,
    fontFamily: "serif",
        }}
        >Create an account</Typography>
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
              name="firstName"
              rules={{
                required: {
                  value: true,
                  message: "First name is Required",
                },
              }}
              // get the field state
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                id="firstName" label="First Name"
                type="text"
                margin="normal"
                sx={{
                    [theme.breakpoints.down("sm")]: {
    width: "17rem",
  },
                }}
                  {...field}
                  required
                  //  is error ??
                  error={errors.firstName ? true : false}
                  // show helper text if it is invalid
                />
              )}
            />
            <Typography variant="body2" color="textSecondary">
              {errors.firstName?.message}
            </Typography>
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
                },
                minLength: {
          value: 8,
          message: "Password must be more than 8 characters"
          },
          maxLength: {
          value: 20,
          message: "Password must be less than 20 characters"
          },
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
          <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: {
                  value: true,
                  message: "Please confirm your password",
                },
                validate: {
                    validatePassword: value =>
           value === watch("password", "") || "Passwords do not match"
                },
              }}
              // get the field state
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                autoComplete='off'
                id="confirmPassword" label="Confirm Password"
                type="password"
                onPaste={(e) =>{
           e.preventDefault();
           return false
           }}
                sx={{
                    [theme.breakpoints.down("sm")]: {
    width: "17rem",
  },
                }}
                  {...field}
                  required
                  //  is error ??
                  error={errors.confirmPassword ? true : false}
                  // show helper text if it is invalid
                />
              )}
            />
            <Typography variant="body2" color="textSecondary">
              {errors.confirmPassword?.message}
            </Typography>
          </Grid>


          <Grid item>
            <Button 
            sx={{
              bgcolor: theme.palette.darkBluePrimary.main,
            }}
            type="submit">
              Sign Up
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
        setFormStep(STEPS.HOME)
      }}
          >Actually, I'd rather continue as a guest</Button>
          </Grid>
      </Grid>
      </Box>
    </Box>
  );
}

export default SignupForm;
