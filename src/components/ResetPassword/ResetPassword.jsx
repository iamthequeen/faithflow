import React, {useContext} from 'react'
import { Box, Grid, Typography, useTheme, IconButton,Button, TextField,  } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../utils/UserContext";


function ResetPassword() {

    const theme = useTheme()

    const {
userFirstName
  } = useContext(UserContext);

    const {
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
        firstName: userFirstName,
      email: "guest@gmail.com",
      password: "",
      confirmPassword: "",
    },
  });


    const onSubmit = async (data) => {

        try {
        alert ("User Created Successfully")
        } catch (error) {
        console.log(error)
        alert ("User created failed:", error);
      }
    }


    return (
        <Box component="main" 
    sx={{
      paddingTop: "1.5rem",
      paddingBottom: "7rem",
      minHeight: "100vh",
      textAlign: "center",
      background: `linear-gradient(195.41deg, rgba(186, 207, 255, 0.67) 27.63%, #FFCEB7 74.14%)`,
    }}
    >
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={4}>
 

        <Grid container item justifyContent="center" alignItems="center"
        spacing={3}
        >
        <Grid item>
        <IconButton
        >
        <FontAwesomeIcon icon={faChevronLeft} color="black" size="xs"/>
        </IconButton>
        </Grid>
        <Grid item>
        <Typography 
        variant="h5" component="h1" sx={{
    fontWeight: 400,
}}>Change Password</Typography>
</Grid>
        </Grid>

        <Grid item>
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
        setFormStep(STEPS.LOG_IN)
      }}
          >Already have an account? Login</Button>
          </Grid>
      </Grid>
      </Box>
        </Grid>

        </Grid>
        </Box>
    )
}

export default ResetPassword