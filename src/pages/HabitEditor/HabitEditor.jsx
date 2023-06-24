import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../utils/UserContext'
import { FormStepContext } from '../../utils/FormStepContext'
import { STEPS } from '../../utils/formSteps'

import { useForm, Controller } from 'react-hook-form';
import { Box, FormControl, FormLabel, FormGroup, Checkbox, FormControlLabel, Typography, Grid, Button, useTheme, IconButton, Alert, CircularProgress, LinearProgress } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Footer from '../../components/Footer/Footer';
import HabitsModal from '../../components/HabitsModal/HabitsModal';
import Header from '../../components/Header/Header';
import { doc, collection, updateDoc, onSnapshot, runTransaction } from "firebase/firestore";
import {auth, db} from "../../utils/firebaseSetup"
import {Link} from 'react-router-dom'




function HabitEditor() {
    const theme = useTheme()
// For Habits (Tracker) Modal/Dialog
    const [open, setOpen] = useState(false);
    const [completionLoading, setCompletionLoading] = useState(false)
    const [initialLoad, setInitialLoad] = useState(true)
    const [formNowDirty, setFormNowDirty] = useState(false)
    const [completionFullyUpdated, setCompletionFullyUpdated] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
    const handleOpenAlert = () => setOpenSuccessAlert(true);
    const handleCloseAlert = () => setOpenSuccessAlert(false);

    useEffect(() => {
        const successTimer = 
            setTimeout(() => {
                if (openSuccessAlert) {
                handleCloseAlert()
                }
            }, [3000])
        

        return () => {
        clearTimeout(successTimer);
      };
    }, [openSuccessAlert])

    const { myHabits, setMyHabits, userData, guestUser } = useContext(UserContext)

    const { setFormStep } = useContext(FormStepContext)


  const [selectedItems, setSelectedItems] = useState([]);

//   const { handleSubmit, setValue, control, formState } = useForm({
//         defaultValues: {
//             habitCheckBoxes: []
//         }
//     });

  const { handleSubmit, setValue, control, reset, formState, formState: { isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues: {
            habit1: myHabits[0].completed,
            habit2: myHabits[1].completed,
            habit3: myHabits[2].completed,
        }
    });



const updatedCompletionFromStorage = () => {
    const habitsCollectionRef = collection(db, `users/${auth?.currentUser?.uid}/habits`)



const unsubscribe = onSnapshot(habitsCollectionRef, (snapshot) => {
  const updatedHabitsArr = [];
  snapshot.forEach((doc) => {
      updatedHabitsArr.push(doc.data());
      })
      setMyHabits(updatedHabitsArr)
  });

return () => {
unsubscribe()
// setCompletionFullyUpdated(true) 
}
}

useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ keepDefaultValues: true });
      setFormNowDirty(false)
    }
  }, [formState, reset]);

useEffect(() => {
    if (auth?.currentUser) {
     const habitsCollectionRef = collection(db, `users/${auth?.currentUser?.uid}/habits`)

const unsubscribe = onSnapshot(habitsCollectionRef, (snapshot) => {
  const updatedHabitsArr = [];
  const updatedCompletionArr = []
  snapshot.forEach((doc) => {
      updatedHabitsArr.push(doc.data());

      if (doc.data().completed) {
        updatedCompletionArr.push(doc.data().name)
      }
      })
      setMyHabits(updatedHabitsArr)
      setSelectedItems(updatedCompletionArr)
  },
  (error) => {
    console.error(error)
  }
  );

return () => {
unsubscribe()
}
}
}, [])
   

    // we are handling the selection manually here
    const handleSelect = (habitName) => {
        if (!selectedItems.includes(habitName)) {
            setSelectedItems((prevItems) => [...prevItems, habitName]);
        } else {
            setSelectedItems((prevItems) =>
      prevItems.filter((val) => val !== habitName)
    );
        }
         
        // const isPresent = selectedItems.indexOf(value);
        // if (isPresent !== -1) {
        //     const remaining = selectedItems.filter((item) => item !== value);
        //     setSelectedItems(remaining);
        // } else {
        //     setSelectedItems((prevItems) => [...prevItems, value]);
        // }
    };


    // useEffect(() => {
    //     setValue("habitCheckBoxes", selectedItems);
    // }, [selectedItems]);



    const initialChecks = () => {
        myHabits.map(myHab => {
            if (myHab.completed) {
                setSelectedItems((prevItems) => [...prevItems, myHab.name])
            }
        })
        setSelectedItems((prevItems) =>
      prevItems.filter((val, index) => prevItems.indexOf(val) === index))

    }

    useEffect(() => {
        // Checks box initially if habit from storage is already completed
        initialChecks()
        setInitialLoad(false)
    }, [])

 
    const onSubmit = async (data) => {

        setCompletionLoading(true)
if (guestUser) {
// myHabits.forEach(myHab => {

// })
setMyHabits(myHabits.map(myHab => {

    if (selectedItems.includes(myHab.name)) {
        return { ...myHab, completed: true}
    } else {
        return {...myHab, completed: false}
    }
}))
//  setMyList(myList.map(artwork => {
    //   if (artwork.id === artworkId) {
    //     // Create a *new* object with changes
    //     return { ...artwork, seen: nextSeen };
    //   } else {
    //     // No changes
    //     return artwork;
    //   }
} else
{
      
const habit1DocRef = doc(db, `users/${auth?.currentUser?.uid}/habits/habit1`);
const habit2DocRef = doc(db, `users/${auth?.currentUser?.uid}/habits/habit2`);
const habit3DocRef = doc(db, `users/${auth?.currentUser?.uid}/habits/habit3`);

try {
    await runTransaction(db, async (transaction) => {
        const habit1Doc = await transaction.get(habit1DocRef)
        if (!habit1Doc.exists()) {
            throw "Habit 1 doc doesn't exist!"
        }

        const newCompletion = selectedItems.includes(habit1Doc.data().name) ? true : false

        transaction.update(habit1DocRef, { completed: newCompletion})
    })

    await runTransaction(db, async (transaction) => {
        const habit2Doc = await transaction.get(habit2DocRef)
        if (!habit2Doc.exists()) {
            throw "Habit 2 doc doesn't exist!"
        }

        const newCompletion = selectedItems.includes(habit2Doc.data().name) ? true : false

        transaction.update(habit2DocRef, { completed: newCompletion})
    })

    await runTransaction(db, async (transaction) => {
        const habit3Doc = await transaction.get(habit3DocRef)
        if (!habit3Doc.exists()) {
            throw "Habit 3 doc doesn't exist!"
        }

        const newCompletion = selectedItems.includes(habit3Doc.data().name) ? true : false

        transaction.update(habit3DocRef, { completed: newCompletion})
    })
    
} catch (err) {
    console.error("Transaction failed:", err)
}

}
handleOpenAlert() 
setCompletionFullyUpdated(false)
setCompletionLoading(false)
    }


    const habitFormElements = myHabits.map((habit, index) => (
      completionLoading || initialLoad ? <LinearProgress color="secondary" key={habit.name} sx={{
        marginBottom: "1rem",
      }}
        /> :  <FormControlLabel
            key={habit.name}
            control={
                <Controller
                name={`habit${index}`}
                    render={({ }) => {
                        return (
                            <Checkbox
                               name={`habit${index}`} 
                                checked={selectedItems.includes(habit.name)}
                                onChange={() => {
                                    handleSelect(habit.name)
                                    setFormNowDirty(true)
                                }}
                            />
                        );
                    }}
                    control={control}
                />
            }
            label={habit.name}

        />
    ))

    return (
        <>
            <Header />
            <Box sx={{
                background: `linear-gradient(195.41deg, rgba(186, 207, 255, 0.67) 27.63%, #FFCEB7 74.14%)`,
                padding: "7rem 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "100vh",
                textAlign: "center",
            }} component="form"
            onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container
                    direction="column"
                    alignItems="center"
                    justifyContent="center" spacing={2}>
{guestUser && <Alert severity="error">Please <Link
 style={{
              color: "rgb(95, 33, 32)"
            }}
            to="/signup">create an account</Link> to save your details.</Alert>
}
                    <Grid item>
                         <FormControl sx={{
                            margin: 3,
                            marginBottom: 0,
                        }} component="fieldset" variant="standard"
                        >
                            <Typography variant="h5" component="legend" sx={{
                                fontWeight: 500,
                            }}>Update Habits</Typography>
                            <FormGroup
                                sx={{
                                    marginTop: "1rem",
                                }}
                            >
                                {habitFormElements}
                            </FormGroup>
                        </FormControl>

                    </Grid>
                    <Grid item>
                        <IconButton
                            sx={{
                                bgcolor: theme.palette.lightBluePrimary.main,
                                marginBottom: 5,
                                color: theme.palette.darkGrayPrimary.main,
                                padding: 1.8,
                                "&:hover": {
                                    bgcolor: theme.palette.whiteSecondary.main,
                                }
                            }}

                            onClick={() => {
                                // setFormStep(STEPS.HABIT_TRACKER)
                                handleOpen()
                            }}
                        >

                            <FontAwesomeIcon icon={faPen} size="xs" />
                        </IconButton>
                    </Grid>
 { 
                    completionLoading && <Grid item>
                    <Alert severity="info">Habits completion updating...</Alert>
                    </Grid>
}                   { 
                    openSuccessAlert && <Grid item>
                    <Alert severity="success">Your habits completion successfully updated!</Alert>
                    </Grid>
}
                    <Grid item>
                        <Button
                            sx={{
                                bgcolor: theme.palette.darkBluePrimary.main,
                            }}
                            // disabled={Object.keys(formState.touchedFields).length === 0}
                            disabled={!formNowDirty || isSubmitting}
                            type="submit"
                        >Done</Button>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
            <HabitsModal
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
            />
        </>
    )
}

export default HabitEditor
