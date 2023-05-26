import React, { useContext, useState } from 'react'
import { UserContext } from '../../utils/UserContext'
import { useForm } from 'react-hook-form';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, styled, Avatar, ListItemAvatar, useTheme, Grid, Typography } from "@mui/material";

const HabitsList = styled(List)({
   '& .MuiListItemAvatar-root': {
    minWidth: 0,
  },
});

function HabitsShowcase({numOfCompletedHabits}){

const theme = useTheme()

const { myHabits } = useContext(UserContext)

const habitElements = myHabits.map(habit => (
<ListItem key={habit.id}>
<ListItemAvatar>
                    <Avatar
                    sx={{
                        bgcolor: 'transparent',
                        color: !habit.completed ? theme.palette.blackPrimary.main : theme.palette.darkGraySecondary.main,
                    }}
                    >
                      {habit.icon}
                    </Avatar>
                  </ListItemAvatar>
<ListItemText primary={habit.name}
sx={{
    textDecoration: !habit.completed ? "none" : "line-through",
    color: !habit.completed ? theme.palette.blackPrimary.main : theme.palette.darkGraySecondary.main,
}}
/>
</ListItem>
))

    return (
        <Grid item container direction="column" justifyContent="center" alignItems="center" spacing={1}>
        <Grid item>
        <Typography variant="h5" component="p">My Habits</Typography>
        <Typography variant="body2">Completed{" "} 
        {numOfCompletedHabits}/{myHabits.length}</Typography>
       <HabitsList>
      {habitElements}
    </HabitsList>
    </Grid>
    </Grid>
    )
}

export default HabitsShowcase