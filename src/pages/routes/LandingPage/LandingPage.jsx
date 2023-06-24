import { Box, Grid, Typography, useTheme, Button,Paper, Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HabitsShowcase from "../../../components/HabitsShowcase/HabitsShowcase";
import Header from "../../../components/Header/Header"
import {Image} from "mui-image"
import { faStar, faHeart, faCloud } from "@fortawesome/free-solid-svg-icons";
import TestimonialsCarousel from "../../../components/ui/TestimonialsCarousel/TestimonialsCarousel";
import {useLocation, useNavigate} from 'react-router-dom'
import LoadingScreen from "../../../components/ui/LoadingScreen/LoadingScreen";

 

function LandingPage() {


const { currentUser, guestUser } = useContext(UserContext)


    const boxItemsData = [
        {
            id: 1,
            name: "Track Your Christian Habits",
            icon: faCloud,
            description: "FaithFlow enables you to effortlessly track your Christian habits, from daily prayer and Bible reading to acts of service and personal reflection.",
        },
        {
            id: 2,
            name: "Stay Consistent and Grow in Faith",
            icon: faStar,
            description: "By maintaining a consistent practice of prayer, Bible study, and other meaningful habits, you'll witness profound transformations in your relationship with God and the world around you.",
        },
        {
            id: 3,
            name: "Designed For You",
            icon: faHeart,
            description: "Our Christian habit tracker is designed to help you cultivate positive habits, deepen your faith, and experience transformative growth. Join our community and embark on a meaningful and fulfilling path towards a stronger relationship with God.",
        }
    ]

const theme = useTheme()
 
  return (
    <>
    <Header/>
    <Box component="main" 
    sx={{
      padding: "7rem 1rem",
      minHeight: "100vh",
      textAlign: "center",
      background: "linear-gradient(180deg, #FFFFFF 0%, rgba(186, 207, 255, 0.74) 82.29%)",
    }}
    >
    <Grid container alignItems="center" direction="column" spacing={2}  >
 
<Grid item xs={6}
>
<Typography variant="h4" component="h1"
sx={{
    textAlign: "left",
    margin: "auto",
}}
>Christian habit tracker app for personal growth and change</Typography>
<Typography variant="body1"
sx={{
    textAlign: "left",
    margin: "auto",
    color: theme.palette.darkGrayPrimary.main
}}
>Build habits, achieve goals, and become a better you</Typography>
</Grid>
      <Grid item xs={6}>
      <Image src="/images/Jesus.jpg" alt="" duration={0} sx={{
        margin: 'auto',
  display: 'block',
//   maxHeight: 250,
  maxWidth: 500,
      }} />
      </Grid>
      </Grid>

<Grid container alignItems="center" justifyContent="center" direction="column" spacing={2} sx={{
    marginTop: "3rem",
}}>
<Grid item>
<Typography color="textPrimary" component="h2" variant="h5"
sx={{
    textDecoration: "underline",
}}
>Features</Typography>
</Grid>
{boxItemsData.map((item) => (
          <Grid
            item
            xs={4}
            // xs={12}
            // md={3.5}
            // minHeight={300}
            key={item.id}
          >
          <Paper
          sx={{
            p: 3,
            maxWidth: "30rem"
          }}
          >
           <FontAwesomeIcon icon={item.icon} color="darkGray" size="xl"/>
           <Typography color="textPrimary" component="h3" variant="h6">{item.name}</Typography>
            <Typography color="textPrimary" variant="body2">{item.description}</Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item>
        <Typography color="textPrimary" component="h2" variant="h5"
sx={{
    marginTop: "1rem",
    textDecoration: "underline",
}}
>What people say</Typography>
        </Grid>
        <Grid item>
         <TestimonialsCarousel/>
         </Grid>
 </Grid>
{/* <TestimonialsCarousel/> */}

    </Box>
    </>
  );
}

export default LandingPage;
