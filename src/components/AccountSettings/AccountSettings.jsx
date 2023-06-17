import React, {useContext, useEffect} from 'react'
import { Box, Grid, Typography, useTheme, IconButton,Button, TextField,  } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../utils/UserContext";
import {auth} from "../../utils/firebaseSetup"


function AccountSettings() {

    const theme = useTheme()

    const {
userFirstName, setUserFirstName, currentUser
  } = useContext(UserContext);


    const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
        firstName: !auth?.currentUser ? userFirstName : currentUser.displayName,
      email: "",
    },
  });

   const guestSubmit = async (data) => {

        try {
            await setUserFirstName(data.firstName)
        alert ("Name Successfully Updated")
        } catch (error) {
        console.log(error)
        alert ("Name Update Failed", error);
      }
    }


    const userSubmit = async (data) => {

        try {
        alert ("User Created Successfully")
        } catch (error) {
        console.log(error)
        alert ("User created failed:", error);
      }
    }

useEffect(() => {
    console.log(userFirstName)
}, [userFirstName])

    return (
        <Box component="main" 
    sx={{
     padding: "7rem 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
}}>Account Settings</Typography>
</Grid>
        </Grid>

{!auth?.currentUser ? 
 <Grid item>
        <Box component="form" sx={{
           '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit(guestSubmit)}
       >
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>

<Grid item>
<Typography variant="body1" component="h2" sx={{
    fontWeight: 400,
}}>Update your information. <br/>
</Typography>
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
         



          <Grid item>
            <Button 
            sx={{
              bgcolor: theme.palette.darkBluePrimary.main,
            }}
            type="submit">
              Save
            </Button>
          </Grid>
      </Grid>
      </Box>
        </Grid>
 : (
        <Grid item>
        <Box component="form" sx={{
           '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit(userSubmit)}
       >
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>

<Grid item>
<Typography variant="body1" component="h2" sx={{
    fontWeight: 400,
}}>Update your information. <br/>
</Typography>
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
              Save
            </Button>
          </Grid>
      </Grid>
      </Box>
        </Grid>)}

        </Grid>
        </Box>
    )
}

export default AccountSettings