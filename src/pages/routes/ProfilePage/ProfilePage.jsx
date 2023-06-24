import { Box, Grid, Typography, useTheme, Button, Avatar, List, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, Alert } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll, faCircleChevronRight, faGear, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../components/Footer/Footer";
import {auth} from "../../../utils/firebaseSetup"
import Header from "../../../components/Header/Header";
import { FOOTER_STEPS } from "../../../utils/formSteps"
import { FormStepContext } from "../../../utils/FormStepContext"
import {Link} from 'react-router-dom'




function ProfilePage() {

const theme = useTheme()

const { currentUser, userFirstName, guestUser, handleOpenModal } = useContext(UserContext)

const { setUserStep } = useContext(FormStepContext)


const optionsList = [
    {
        id: 1,
        avatarIcon: faUser,
        name: "Account",
        stepName: FOOTER_STEPS.ACCOUNT_SETTINGS,
    },
    {
        id: 2,
        avatarIcon: faScroll,
        name: "Terms of Use",
        stepName: FOOTER_STEPS.TERMS_OF_USE,
    },
    // {
    //     id: 3,
    //     avatarIcon: faGear,
    //     name: "Settings",
    // }
]

const optionsListElements =  optionsList.map(option => (
<ListItemButton key={option.id}
onClick={() => {
    setUserStep(option.stepName)
}}
      sx={{
        background: "rgba(255, 255, 255, 0.25)",
  borderRadius: "5px",
        "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.25)",
        }
      }}
      >
      <ListItemAvatar>
                    <Avatar
                    sx={{
                        bgcolor: 'transparent',
                        color: theme.palette.darkGrayPrimary.main,
                    }}
                    >
<FontAwesomeIcon icon={option.avatarIcon} />                    
</Avatar>
                  </ListItemAvatar>
        <ListItemText primary={option.name} />
            <ListItemIcon
            sx={{
                color: theme.palette.darkBluePrimary.main,
            }}
            >
                <FontAwesomeIcon icon={faCircleChevronRight} size="lg" />
        </ListItemIcon>
      </ListItemButton>
)) 
 
  return (
    <>
    <Header/>
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
 {guestUser && <Alert severity="error">Please <Link
 style={{
              color: "rgb(95, 33, 32)"
            }}
            to="/signup">create an account</Link> to save your details.</Alert>
}


        <Grid item>
        <Typography 
        variant="h4" component="h1" sx={{
    fontWeight: 400,
}}>Profile</Typography>
     
      <Avatar 
      sx={{
        bgcolor: theme.palette.lightGreenPrimary.main,
        width: 56,
        height: 56,
        margin: "1rem auto",
      }}
      >
     
      </Avatar>

      <Typography variant="body1">
      {auth?.currentUser ? currentUser.displayName : userFirstName}
    {/*  {JSON.stringify(currentUser, null, 2)} */}
{/*      {currentUser.displayName}
*/}      </Typography>

      <Typography variant="body1">
      {auth?.currentUser && currentUser.email}
{/*      {currentUser.email}
*/}      </Typography>
      </Grid>


      <Grid item>
       <List
      sx={{ 
        maxWidth: "20rem", 
        width: "60%", 
        minWidth: 280,
        }}
      component="nav"
    //   aria-labelledby="nested-list-subheader"
    >
      
{optionsListElements}
     
    </List>
      
      
      
       <Button 
       onClick={handleOpenModal}
      sx={{
        color: theme.palette.darkBluePrimary.main,
      }}
      variant="text" startIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}>
  Log out
</Button>
      </Grid>
      </Grid>
    </Box>
    <Footer/>
    </>
  );
}

export default ProfilePage;
