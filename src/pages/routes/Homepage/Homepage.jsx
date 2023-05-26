import { Box, Grid, Typography, useTheme, Button, Avatar, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HabitsShowcase from "../../../components/HabitsShowcase/HabitsShowcase";
import Footer from "../../../components/Footer/Footer";


function Homepage() {

const theme = useTheme()

const { currentUser, userFirstName, myHabits } = useContext(UserContext)

useEffect(() => {
  console.log(currentUser)
}, [currentUser])

const calculateCompletedHabits = (habits) => {
    let totalHabits = 0;
    let completedHabits = 0;

    habits.forEach((habit) => {
      totalHabits++;
      if (habit.completed) {
        completedHabits++;
      }
    });

    return completedHabits
}

const calculatePercentage = (habits) => {
    let totalHabits = 0;
    let completedHabits = 0;

    habits.forEach((habit) => {
      totalHabits++;
      if (habit.completed) {
        completedHabits++;
      }
    });

    const percentage = (completedHabits / totalHabits) * 100;
    return Math.trunc(percentage); 
  };

  const [ percentageCompleted ] = useState(calculatePercentage(myHabits));

const [bar, setBar] = useState(percentageCompleted);

const [ numOfCompletedHabits ] = useState(calculateCompletedHabits(myHabits))

const barColor = () => {
    switch(true) {
        case (bar <= 25): 
        return theme.palette.redPrimary.main;
        case (bar >= 26 && bar <= 49): 
        return theme.palette.orangePrimary.main;
        case (bar >= 50 && bar <= 74): 
        return theme.palette.yellowPrimary.main;
        case (bar >= 75 && bar <= 99): 
        return theme.palette.lightGreenPrimary.main;
        case (bar === 100): 
        return theme.palette.greenPrimary.main;
        default:
        return theme.palette.blackPrimary.main;
    }
}
 
  return (
    <>
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
 

        <Grid item>
        <Typography 
        variant="h4" component="h1" sx={{
    // fontWeight: 400,
}}>{userFirstName}{userFirstName.slice(-1) === "s" ? "'" : "'s"} <Typography component="span" variant="h4"
sx={{
    color: theme.palette.darkBluePrimary.main,
    fontWeight: 500,
}}>Progress</Typography></Typography>
     
     </Grid>

     <Grid item>
<Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={bar} size="8rem"
      sx={{
        color: barColor(),
      }}
       />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" component="div" color="text.secondary">
          {`${Math.round(bar)}%`}
        </Typography>
      </Box>
      </Box>
     </Grid>

     <Grid item>
     <HabitsShowcase
     numOfCompletedHabits={numOfCompletedHabits}
     />
     </Grid>
      </Grid>
    </Box>
    <Footer/>
    </>
  );
}

export default Homepage;
