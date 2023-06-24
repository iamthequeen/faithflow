import React, {useContext, useEffect} from 'react'
import { Box, Grid, Typography, useTheme, IconButton,Button, TextField,  } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../../utils/UserContext";
import { FormStepContext } from "../../utils/FormStepContext";
import { FOOTER_STEPS } from "../../utils/formSteps"
import {db, auth} from "../../utils/firebaseSetup"
import { updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";




function AccountSettings() {

    const theme = useTheme()

    const {
userFirstName, setUserFirstName, currentUser, guestUser
  } = useContext(UserContext);

  const { setUserStep } = useContext(FormStepContext)



    const {
    setValue,
    handleSubmit,
    control,
    formState,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
        firstName: !auth?.currentUser ? userFirstName : currentUser.displayName,
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
    //   reset({keepValues: true},{keepDirty: false});
    reset({
        firstName: !auth?.currentUser ? userFirstName : currentUser.displayName,
    })
    //   setFormNowDirty(false)
    }
  }, [formState, reset]);

   const guestSubmit = async (data) => {

        try {
            await setUserFirstName(data.firstName)
        alert ("Name Successfully Updated")
        } catch (err) {
        console.error(err)
        alert ("Name Update Failed.", err);
      }
    }


    const userSubmit = async (data) => {

        try {
                await updateProfile(auth?.currentUser, { displayName: data.firstName })

                const userDocRef = doc(db, "users", `${auth?.currentUser?.uid}`);

// Set the "capital" field of the city 'DC'
await updateDoc(userDocRef, {
  name: data.firstName
});

        alert ("Name Successfully Updated")
        } catch (err) {
        console.error(err)
        alert ("Name Update Failed.", err);
      }
    }



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
        spacing={2}
        >
        <Grid item>
        <IconButton
        onClick={() => {
            setUserStep(FOOTER_STEPS.PROFILE)
        }}
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

 <Grid item>
        <Box component="form" sx={{
           '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit(guestUser ? guestSubmit : userSubmit)}
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
            type="submit"
            disabled={isSubmitting || !isValid || !isDirty}
            >
              Save
            </Button>
          </Grid>
      </Grid>
      </Box>
        </Grid>

        </Grid>
        </Box>
    )
}

export default AccountSettings
