import { Box, Grid, Typography, useTheme, Button, TextField, ButtonGroup } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/UserContext";
import { FormStepContext } from "../../utils/FormStepContext";
import { STEPS } from "../../utils/formSteps";


function ImprovementsPage() {

    const theme = useTheme()

        const { setFormStep } = useContext(FormStepContext)

        const [ improvementsSelected, setImprovementsSelected ] = useState()


const [ personalImprovements, setPersonalImprovements ] = useState([])

const handleAdd = (desiredImprovement) => {
    setPersonalImprovements(prevPersonalImprovements => [...prevPersonalImprovements, desiredImprovement])
} 

const handleRemove = (desiredImprovement) => {
    setPersonalImprovements((prevPersonalImprovements) =>
      prevPersonalImprovements.filter((val) => val !== desiredImprovement)
    );
  };

   
    const ImprovementsList = [
        {
            id: 1,
            name: "Praying daily",
        },
        {
            id: 2,
            name: "Studying the bible",
        },
        {
            id: 3,
            name: "Practicing gratitude or journaling",
        },
        {
            id: 4,
            name: "Attending church or small group meetings",
        },
        {
            id: 5,
            name: "Volunteering or serving others in the community",
        },
        {
            id: 6,
            name: "Fasting or intentional periods of reflection",
        },
        {
            id: 7,
            name: "Memorizing scripture or Bible verses",
        },
        {
            id: 8,
            name: "Sharing my faith with others",
        },
        {
            id: 9,
            name: "Regularly seeking out spiritual mentorship or guidance",
        },
        {
            id: 10,
            name: "Having more faith",
        },
        {
            id: 11,
            name: "Taking better care of myself",
        },
    ]

const improvementButtons = ImprovementsList.map((improvement) => (
    <Grid item key={improvement.id}>
    <Button
    sx={{
        border: "3px solid",
        borderColor: personalImprovements.includes(improvement.name) ? theme.palette.pinkPrimary.main : theme.palette.lightGrayPrimary.main,
        borderRadius: "15px",
        color: theme.palette.blackPrimary.main,             backgroundColor: personalImprovements.includes(improvement.name) ? theme.palette.pinkPrimary.main : theme.palette.whiteTertiary.main,


        "&:hover": {
      backgroundColor: theme.palette.pinkPrimary.main,
      border: `3px solid ${theme.palette.pinkPrimary.main}`,
    },
    }}

    onClick={() => {
        if (!personalImprovements.includes(improvement.name)) {
            handleAdd(improvement.name)
        } else {
            handleRemove(improvement.name)
        }
        
    }} 
    >{improvement.name}</Button>
    </Grid>
)) 

const {
    
  } = useContext(UserContext);


   
 
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
}}>What are some improvements you desire for your life?</Typography>
{improvementsSelected === false && (
<Typography variant="body1" sx={{
    color: theme.palette.redPrimary.main,
    fontWeight: 600,
}}>Select at least 1 improvement.</Typography>
)}
</Grid>
<Grid item>


<ButtonGroup orientation="vertical" size="large" variant="contained"
sx={{
    boxShadow: "none"
}}
>
<Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
{improvementButtons}
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
        if (personalImprovements.length === 0) {
            setImprovementsSelected(false)
        } else {
            setImprovementsSelected(true)
            setFormStep(STEPS.HABIT_TRACKER)
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

export default ImprovementsPage;
