import { Box, Grid, Typography, useTheme, Button, TextField, ButtonGroup } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/UserContext";
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS } from "../../utils/formSteps";


function StrugglesPage() {

    const theme = useTheme()

    const {
        setFormStep
    } = useContext(FormStepContext)

    const [ strugglesSelected, setStrugglesSelected ] = useState()

const [ personalStruggles, setPersonalStruggles ] = useState([])

const handleAdd = (myStruggle) => {
    setPersonalStruggles(prevPersonalStruggles => [...prevPersonalStruggles, myStruggle])
} 

const handleRemove = (myStruggle) => {
    setPersonalStruggles((prevPersonalStruggles) =>
      prevPersonalStruggles.filter((val) => val !== myStruggle)
    );
  };

   
    const strugglesList = [
        {
            id: 1,
            name: "Temptation to do the wrong things",
        },
        {
            id: 2,
            name: "Doubt",
        },
        {
            id: 3,
            name: "Forgiving others/myself",
        },
        {
            id: 4,
            name: "Having faith",
        },
        {
            id: 5,
            name: "Fear of sharing my beliefs with others",
        },
        {
            id: 6,
            name: "Feeling spiritually stagnant or disconnected",
        },
        {
            id: 7,
            name: "Difficulty finding a community of believers",
        },
        {
            id: 8,
            name: "Praying consistently",
        },
        {
            id: 9,
            name: "Feeling overwhelmed with spiritual expectations",
        },
        {
            id: 10,
            name: "Reading and understanding the bible",
        },
        {
            id: 11,
            name: "Getting distracted or being lazy",
        },
    ]

    // useEffect(() => {
    //     if (personalStruggles.length === 0) {
    //         setStrugglesSelected(false)
    //     }
    // })

const struggleButtons = strugglesList.map((struggle) => (
    <Grid item key={struggle.id}>
    <Button
    sx={{
        border: `3px solid ${theme.palette.lightGrayPrimary.main}`,
        
        borderRadius: "15px",
        color: theme.palette.blackPrimary.main,
                backgroundColor: personalStruggles.includes(struggle.name) ? theme.palette.pinkPrimary.main : theme.palette.whiteTertiary.main,


        "&:hover": {
      backgroundColor: theme.palette.pinkPrimary.main,
      border: `3px solid ${theme.palette.pinkPrimary.main}`,
    },
    }}

    onClick={() => {
        if (!personalStruggles.includes(struggle.name)) {
            handleAdd(struggle.name)
        } else {
            handleRemove(struggle.name)
        }
        
    }}
    >{struggle.name}</Button>
    </Grid>
))

const {
    
  } = useContext(UserContext);

 

  useEffect(() => {
  
  }, []);

   
 
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
        component="h1"
        variant="h4"
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
}}>What are some things you struggle with?</Typography>
{strugglesSelected === false && (
<Typography variant="body1" sx={{
    color: theme.palette.redPrimary.main,
    fontWeight: 600,
}}>Select at least 1 struggle.</Typography>
)}
</Grid>

<Grid item>


<ButtonGroup orientation="vertical" size="large" variant="contained"
sx={{
    boxShadow: "none"
}}
>

<Grid container item direction="column" justifyContent="center" alignItems="center" spacing={1}>
{struggleButtons}
</Grid>
</ButtonGroup>

</Grid>

<Grid item>
<Button
      sx={{
        borderRadius: "14px",
        backgroundColor: theme.palette.darkBluePrimary.main,
      }}
      
      onClick={() => {
        window.scrollTo(0,0)
        if (personalStruggles.length === 0) {
            setStrugglesSelected(false)
        } else {
            setStrugglesSelected(true)
            setFormStep(STEPS.IMPROVEMENTS)
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

export default StrugglesPage;
