import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../utils/UserContext'
import { FormStepContext } from '../../utils/FormStepContext'
import { STEPS } from '../../utils/formSteps'

import { useForm, Controller } from 'react-hook-form';
import { Box, FormControl, FormLabel, FormGroup, Checkbox, FormControlLabel, Typography, Grid, Button, useTheme,IconButton } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from "@fortawesome/free-solid-svg-icons";


function HabitEditor(){
    const theme = useTheme()
const { myHabits } = useContext(UserContext)

const { setFormStep } = useContext(FormStepContext)


const { register, handleSubmit, setValue, control } = useForm();

const [selectedItems, setSelectedItems] = useState([]);


  // we are handling the selection manually here
  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  useEffect(() => {
    setValue("HabitCheckBoxes", selectedItems); 
  }, [selectedItems]);

  useEffect(() => {
    console.log(selectedItems)
  }, [selectedItems])


  const habitFormElements = myHabits.map((habit) => (
<FormControlLabel
              control={
                <Controller
                  name={habit.name}
                  render={({}) => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(habit.name)}
                        onChange={() => handleSelect(habit.name)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={habit.name}
              key={habit.id}
            />
  ))

    return (
       <Box sx={{ 
       background: `linear-gradient(195.41deg, rgba(186, 207, 255, 0.67) 27.63%, #FFCEB7 74.14%)`, 
       minHeight: "100vh",
      textAlign: "center", }} component="form">
      <Grid container 
      direction="column"
      alignItems="center"
      justifyContent="center" spacing={2}>

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
                setFormStep(STEPS.HABIT_TRACKER)
            }}
      >
      
      <FontAwesomeIcon icon={faPen} size="xs" /> 
      </IconButton>
</Grid>

      <Grid item>
      <Button
      sx={{
              bgcolor: theme.palette.darkBluePrimary.main,
            }}
      >Done</Button>
      </Grid>
      </Grid>
    </Box>
    )
}

export default HabitEditor