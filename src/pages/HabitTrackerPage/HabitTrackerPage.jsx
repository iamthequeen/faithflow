import React, { useState, useContext, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  TextField,
  Typography, useTheme, Alert, AlertTitle, CircularProgress } from '@mui/material';
import { UserContext } from '../../utils/UserContext';
import {auth, db} from "../../utils/firebaseSetup"
import { habits } from '../../utils/helpers';
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS } from "../../utils/formSteps";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { doc, collection, updateDoc, onSnapshot, runTransaction, writeBatch } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';



function HabitTrackerPage({open, handleClose}) {
  const theme = useTheme();

  const location = useLocation()
const navigate = useNavigate()

  const { myHabits, setMyHabits, setMyHab1, setMyHab2, setMyHab3, currentUser } = useContext(UserContext)

      const { setFormStep } = useContext(FormStepContext)

      const [isUpdateLoading, setIsUpdateLoading] = useState(false)

      const [successAlert, setSuccessAlert] = useState(null)

      const [alertDetails, setAlertDetails] = useState({
        type: "",
        title: "",
        color: "",
      })

    //   useEffect(() => {
    //     handleAlertDetails()
    //   }, [successAlert])



      const handleAlertDetails = () => {
switch(successAlert){
            case null: 
            setAlertDetails({
                type: "info",
                title: "Loading",
                color: "darkGrayPrimary",
            })
            case "success": 
            setAlertDetails({
                type: "success",
                title: "Habits List Successfully Updated",
                color: "success",
            })
            case "fail": 
            setAlertDetails({
                type: "error",
                title: "Habits List Failed to Update. Please Try Again.",
                color: "error",
            })
            default: 
            return "Something went wrong!"
        }
      }

      const handleAlertIcon = () => {
        switch(successAlert){
            case null:
//             return <Alert severity="info" color="darkGray" icon={false}>
// <AlertTitle>Loading...</AlertTitle>
// <CircularProgress color="inherit" /></Alert>;
return <Alert severity="warning" icon={false}>
<AlertTitle>Loading...</AlertTitle>
<CircularProgress color="inherit" /></Alert>;
            case "success": 
            // return <FontAwesomeIcon icon={faCheck} color="green" size="xl"/>
        return <Alert severity="success" icon={false}>
<AlertTitle>Habits List Successfully Updated</AlertTitle>
<FontAwesomeIcon icon={faCheck} color="green" size="xl"/></Alert>;
        case "fail": 
        // return <FontAwesomeIcon icon={faX} color="red" size="xl"/>;
        return <Alert severity="error" icon={false}>
<AlertTitle>Habits List Failed to Update. Please Try Again.</AlertTitle>
<FontAwesomeIcon icon={faX} color="red" size="xl"/></Alert>;
        default:
        return "No icon!";
        }
      }

       useEffect(() => {
        const alertTimer = 
            setTimeout(() => {
                if (successAlert) {
                handleClose()
                // setOpen(false)
                setIsUpdateLoading(false)
                setSuccessAlert(null)
                }
            }, [3000])
        

        return () => {
        clearTimeout(alertTimer);
      };
    }, [successAlert])


  const [visible, setVisible] = useState([]);

const toggleVisibility = (id) => {
    const newVisible = [...visible];
    const index = newVisible.indexOf(id);
    if (index === -1) {
      newVisible.push(id);
    } else {
      newVisible.splice(index, 1);
    }
    setVisible(newVisible);
  }

  const [ habitsSelected, setHabitsSelected ] = useState()


 const handleSeparatingHabits = () => {
    setMyHab1(myHabits[0])
    setMyHab2(myHabits[1])
    setMyHab3(myHabits[2])
  }

// const handleAdd = (habitObject) => {
//     if (myHabits.length === 3) {
//       setMyHabits((prevMyHabits) => [...prevMyHabits.slice(1), habitObject]);
//     } else {
//       setMyHabits((prevMyHabits) => [...prevMyHabits, habitObject]);
//     }
//   };

  const handleAdd = (habitObject) => {
    if (myHabits.length === 3) {
      setMyHabits((prevMyHabits) => [...prevMyHabits.slice(1), habitObject]);
    } else {
      setMyHabits((prevMyHabits) => [...prevMyHabits, habitObject]);
    }
  };

  const handleRemove = (habitObject) => {
    setMyHabits((prevMyHabits) =>
      prevMyHabits.filter((habit) => habit.name !== habitObject.name)
    );
  };

//   const handleRemove = (habitObject) => {
//     setMyHabits((prevMyHabits) =>
//       prevMyHabits.filter((habit) => habit.id !== habitObject.id)
//     );
//   };

const handleHabitsUpdate = async () => {
    if (currentUser) {
        const habit1DocRef = doc(db, `users/${auth?.currentUser?.uid}/habits/habit1`);
const habit2DocRef = doc(db, `users/${auth?.currentUser?.uid}/habits/habit2`);
const habit3DocRef = doc(db, `users/${auth?.currentUser?.uid}/habits/habit3`);

setIsUpdateLoading(true)

try {
    const batch = writeBatch(db)
// if (!habitDocCreated) {
//    await myHabits.forEach((data, index) => {
//         const docRef = doc(db, `users/${auth?.currentUser?.uid}/habits/habit${index + 1}`)
//         batch.set(docRef, data)
//     })

    batch.set(habit1DocRef, myHabits[0])
      batch.set(habit2DocRef, myHabits[1])
        batch.set(habit3DocRef, myHabits[2])

    await batch.commit().then(() => {
        setSuccessAlert("success")
        // setHabitDocCreated(true)
    }).catch((err) => {
        console.error("batch write failed: ", err)
        // setHabitDocCreated(false)
        setSuccessAlert("fail")
    })

// }
    
} catch (err) {
    console.error(err)
    setSuccessAlert("fail")
}

// try {
//     await runTransaction(db, async (transaction) => {
//         const habit1Doc = await transaction.get(habit1DocRef)
//         if (!habit1Doc.exists()) {
//             throw "Habit 1 doc doesn't exist!"
//         }

//         const isNewHabit = habit1Doc.data().name !== myHabits[0].name
    
//     if (isNewHabit) {
//         transaction.set(habit1DocRef, myHabits[0])
//         }
//     })

//     await runTransaction(db, async (transaction) => {
//         const habit2Doc = await transaction.get(habit2DocRef)
//         if (!habit2Doc.exists()) {
//             throw "Habit 2 doc doesn't exist!"
//         }

//         const isNewHabit = habit2Doc.data().name !== myHabits[1].name
    
//     if (isNewHabit) {
//         transaction.set(habit2DocRef, myHabits[1])
//         }
//     })

//     await runTransaction(db, async (transaction) => {
//         const habit3Doc = await transaction.get(habit3DocRef)
//         if (!habit3Doc.exists()) {
//             throw "Habit 3 doc doesn't exist!"
//         }

//        const isNewHabit = habit3Doc.data().name !== myHabits[2].name
    
//     if (isNewHabit) {
//         transaction.set(habit3DocRef, myHabits[2])
//         }
//     })
    
//     console.log("Transaction successfully committed!")(true)
//     setSuccessAlert(true)
// } catch (err) {
//     console.error("Transaction failed:", err)(false)
//     setSuccessAlert(false)
// }


// handleOpenAlert() 
// setCompletionFullyUpdated(false)
// setIsUpdateLoading(false)
    }
}



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
    },
    [theme.breakpoints.down(450)]: {
        width: "14rem",
    } 
}}
>
<ListItemButton
onClick={() =>
myHabits.some(myHab => myHab.name === habit.name) ?
handleRemove({
    id: habit.id,
    name: habit.name,
    completed: habit.completed,
}) : handleAdd({
    id: habit.id,
    name: habit.name,
    completed: habit.completed,
})
}
sx={{
     border: "3px solid",
        borderColor: myHabits.some(myHab => myHab.name === habit.name) ? theme.palette.pinkPrimary.main : theme.palette.lightGrayPrimary.main,
     borderRadius: "15px",
     color: theme.palette.blackPrimary.main,             
     backgroundColor: myHabits.some(myHab => myHab.name === habit.name) ? theme.palette.pinkPrimary.main : "transparent",
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
    toggleVisibility(habit.id)
}}>
{ !visible.includes(habit.id) ?  "Why? \u2304" : "Hide \u2303"}
</Button>
{ visible.includes(habit.id) && <Typography variant="body2">
{habit.description}
</Typography>}
</Box>
</ListItem>
  ))

  return (
    <Box component="main" 
    sx={{
      paddingTop: !isUpdateLoading ? "6rem" : "1rem",
      minHeight: !isUpdateLoading ? "100vh" : "100%",
      textAlign: "center",
      background: `linear-gradient(44.1deg, ${theme.palette.whitePrimary.main} 36.52%, ${theme.palette.bluePrimary.main} 68.57%)`,
    //   display: isUpdateLoading && "flex",
    //   flexDirection: isUpdateLoading && "column",
    //   alignItems: isUpdateLoading && "center",
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
        {!isUpdateLoading ?
        <>
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
    disabled={isUpdateLoading}
       onClick={() => {
        window.scrollTo(0,0)
        if (myHabits.length !== 3) {
            setHabitsSelected(false)
        } else {
            setHabitsSelected(true)
            // handleSeparatingHabits()
          if ( location.pathname === "/myhome") {
        //    setFormStep(STEPS.SAVE_PROGRESS)
        handleHabitsUpdate()
        if (!currentUser) {
         handleClose()
         }
       } else {
         setFormStep(STEPS.SAVE_PROGRESS)
       }
    // change location from === to !==
       }

      }}
      >
    {location.pathname === "/myhome" ? "Done" : "Continue"}
      </Button>
</Grid>
 </>
:
<Grid item>
{ /* <Alert severity={alertDetails.type} color={alertDetails.color} icon={false}>
<AlertTitle>{alertDetails.title}</AlertTitle>
{handleAlertIcon() 
</Alert> */}
{handleAlertIcon()}
</Grid>
}
        </Grid>


          </Box>
  );
}

export default HabitTrackerPage;
