import React, { useState, useContext, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  TextField,
  Typography, useTheme } from '@mui/material';
import { UserContext } from '../../utils/UserContext';
import { habits } from '../../utils/helpers';
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS } from "../../utils/formSteps";


function HabitTrackerPage() {
  const theme = useTheme();

  const { myHabits, setMyHabits } = useContext(UserContext)

      const { setFormStep } = useContext(FormStepContext)


  // const [visible, setVisible] = useState([]);

// const toggleVisibility = (id) => {
//     const newVisible = [...visible];
//     const index = newVisible.indexOf(id);
//     if (index === -1) {
//       newVisible.push(id);
//     } else {
//       newVisible.splice(index, 1);
//     }
//     setVisible(newVisible);
//   }


const [activeDescription, setActiveDescription] = useState(0);

  const [ habitsSelected, setHabitsSelected ] = useState()

const handleAdd = (habitObject) => {
    if (myHabits.length === 3) {
      setMyHabits((prevMyHabits) => [...prevMyHabits.slice(1), habitObject]);
    } else {
      setMyHabits((prevMyHabits) => [...prevMyHabits, habitObject]);
    }
  };

  const handleRemove = (habitObject) => {
    setMyHabits((prevMyHabits) =>
      prevMyHabits.filter((habit) => habit.id !== habitObject.id)
    );
  };


  const habitTrackerListItems = habits.map(habit => (
    <ListItem
    key={habit.id}
sx={{
    borderRadius: "0.5rem",
    bgcolor: theme.palette.whiteSecondary.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "1rem",
    width: "30rem",
    [theme.breakpoints.down('sm')]: {
        width: "18rem",
    } 
}}
>
<ListItemButton
onClick={() =>
myHabits.some(myHab => myHab.id === habit.id) ? handleRemove(habit) : handleAdd(habit)
}
sx={{
     border: "3px solid",
        borderColor: myHabits.some(myHab => myHab.id === habit.id) ? theme.palette.pinkPrimary.main : theme.palette.lightGrayPrimary.main,
     borderRadius: "15px",
     color: theme.palette.blackPrimary.main,             backgroundColor: myHabits.some(myHab => myHab.id === habit.id) ? theme.palette.pinkPrimary.main : "transparent",
        "&:hover": {
      backgroundColor: theme.palette.pinkPrimary.main,
      border: `3px solid ${theme.palette.pinkPrimary.main}`,
    },
}}
>
<ListItemText
primary={habit.name}
/>
</ListItemButton>
<Box>
<Button variant="" onClick={() => {
   activeDescription === habit.id ? setActiveDescription(0) : setActiveDescription(habit.id)
}}>
{ activeDescription !== habit.id ?  "Why? \u2304" : "Hide \u2303"}
</Button>
{ activeDescription === habit.id && <Typography
sx={{
  color: theme.palette.blackPrimary.main,
}}
 variant="body2">
{habit.description}
</Typography>}
</Box>
</ListItem>
  ))

  return (
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
    margin: "0 1rem",
}}>Select 3 habits you'd like to focus on.</Typography>
{habitsSelected === false && (
<Typography variant="body2" sx={{
    color: theme.palette.redPrimary.main,
    fontWeight: 600,
}}>Please select 3 habits.</Typography>
)}
</Grid>

<Grid item>
<List>
{habitTrackerListItems}
</List>
</Grid>

<Grid item>
<Button
      sx={{
        borderRadius: "14px",
        backgroundColor: theme.palette.darkBluePrimary.main,
      }}

       onClick={() => {
        window.scrollTo(0,0)
        if (myHabits.length !== 3) {
            setHabitsSelected(false)
        } else {
            setHabitsSelected(true)
           setFormStep(STEPS.SAVE_PROGRESS)
        }

      }}
      >
      Continue
      </Button>
</Grid>
        </Grid>


          </Box>
  );
}

export default HabitTrackerPage;
