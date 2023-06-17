import { Box, Grid, Typography, useTheme, Button, Avatar, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HabitsShowcase from "../../../components/HabitsShowcase/HabitsShowcase";
import Footer from "../../../components/Footer/Footer";
import {auth, db} from "../../../utils/firebaseSetup"
import {findUser} from "../../../utils/helpers"
import Header from "../../../components/Header/Header";
import { collection, getDocs, onSnapshot, writeBatch, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import HabitTrackerPage from "../../HabitTrackerPage/HabitTrackerPage";


function Homepage() {

const theme = useTheme()

const { currentUser, userFirstName, myHabits, setMyHabits, userData, setUserData, guestUser } = useContext(UserContext)

// const [userData, setUserData] = useState([])
const [isLoading, setIsLoading] = useState([]);
const [habitDocCreated, setHabitDocCreated] = useState(false)
const [areHabitsLoading, setAreHabitsLoading] = useState(true)
const [gotUserData, setGotUserData] = useState(false)

//    const [ percentageCompleted ] = useState(calculatePercentage(myHabits));

//   const [ percentageCompleted, setPercentageCompleted ] = useState(0);

const [bar, setBar] = useState(0);

// const [ numOfCompletedHabits ] = useState(calculateCompletedHabits(myHabits))

const [ numOfCompletedHabits, setNumOfCompletedHabits ] = useState(0)



useEffect(() => {
    if (myHabits.length === 0 && auth?.currentUser) {
    setAreHabitsLoading(true)
    retrieveHabits()
} else {
    setAreHabitsLoading(false)
}
}, [myHabits])

useEffect(() => {
    if (!areHabitsLoading && auth?.currentUser) {
    calculateCompletedHabits()
    calculatePercentage()
} 
}, [areHabitsLoading])

useEffect(() => {
    if (guestUser) {
    calculateCompletedHabits()
    calculatePercentage()
} 
}, [])


const handleName = (name) => {
    return `${name}${name.slice(-1) === "s" ? "'" : "'s"} `

}

const fetchUserData = async () => {
    // setIsLoading(true)
setGotUserData(false)
     try {
      const res = await findUser()
// console.log(res)
    setUserData({...res})
    } catch (error) {
      console.error(error)
      setGotUserData(false)
    }
    setGotUserData(true)

    // setIsLoading(false)
}

const retrieveHabits = async () => {

const habitArr = []
  try {
  const querySnapshot = await getDocs(collection(db, `users/${auth?.currentUser?.uid}/habits`));


querySnapshot.forEach((doc) => {
    
    habitArr.push({...doc.data()})

});
  } catch (err) {
    console.error(err)
    setMyHabits([])
  }

setMyHabits(habitArr)
}

useEffect(() => {

    // optional chaining
    if (auth?.currentUser && !gotUserData) {
    fetchUserData()
    console.log(auth?.currentUser?.uid)
    }
})

useEffect(() => {

 console.log(myHabits)

}, [myHabits]);



useEffect(() => {
    console.log(userData)
}, [userData])

// useEffect(() => {
//    if (userData) {
//     addHabitsCollection()
//    }
// }, [userData, habitDocCreated])


// const calculateCompletedHabits = (habits) => {
//     let totalHabits = 0;
//     let completedHabits = 0;

//     habits.forEach((habit) => {
//       totalHabits++;
//       if (habit.completed) {
//         completedHabits++;
//       }
//     });

//     return completedHabits
// }

const calculateCompletedHabits = () => {
    let totalHabits = 0;
    let completedHabits = 0;

    myHabits.forEach((habit) => {
      totalHabits++;
      if (habit.completed) {
        completedHabits++;
      }
    });

    setNumOfCompletedHabits(completedHabits)
}

// const calculatePercentage = (habits) => {
//     let totalHabits = 0;
//     let completedHabits = 0;

//     habits.forEach((habit) => {
//       totalHabits++;
//       if (habit.completed) {
//         completedHabits++;
//       }
//     });

//     const percentage = habits.length !== 0 ? (completedHabits / totalHabits) * 100 : 0
//     return Math.trunc(percentage); 
//   };

const calculatePercentage = () => {
    let totalHabits = 0;
    let completedHabits = 0;

    myHabits.forEach((habit) => {
      totalHabits++;
      if (habit.completed) {
        completedHabits++;
      }
    });

    const percentage = myHabits.length !== 0 ? (completedHabits / totalHabits) * 100 : 0
    // setPercentageCompleted(Math.trunc(percentage)); 
    setBar(Math.trunc(percentage))
  };


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

// useEffect(() => {
//     if (auth?.currentUser && userData.length !== 0) {
//         setMyHabits([...userData])
//     }
// })

// useEffect(() => {
//     console.log(myHabits)
// }, [myHabits])
 
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
 

       {userData.length === 0 ? <Grid item>
       <CircularProgress/>
       </Grid> :
       <>
        <Grid item>
        <Typography 
        variant="h4" component="h1" sx={{
}}>{auth?.currentUser ? handleName(currentUser.displayName) : handleName(userFirstName)}<Typography component="span" variant="h4"
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
     userData={userData}
     areHabitsLoading={areHabitsLoading}
     setAreHabitsLoading={setAreHabitsLoading}
     />
     </Grid>
     </>
     }
      </Grid>
    </Box>
    <Footer/>
    </>
  );
}

export default Homepage;