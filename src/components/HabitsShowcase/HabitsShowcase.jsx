import React, { useContext, useState } from 'react'
import { UserContext } from '../../utils/UserContext'
import { useForm } from 'react-hook-form';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, styled, Avatar, ListItemAvatar, useTheme, Grid, CircularProgress, Typography } from "@mui/material";
import { habits } from '../../utils/helpers'
 import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
   import { faBookBible, faHandsPraying, faChurch, faHandBackFist, faPersonRunning, faMusic, faFilm, faMoneyBill, faBook, faBroom, faAppleWhole, faPersonShelter, faPeoplePulling, faBullseye, faFaceSmile, faClipboardList, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";


const habitIcons = [
  { id: 1,
  icon: faBookBible,
   },
  { id: 2,
  icon: faHandsPraying,
   },
  { id: 3, 
  icon: faChurch,
   },
  { id: 4,
  icon: faHandBackFist,
   },
  { id: 5,
  icon: faPersonRunning,
   },
  { id: 6, 
  icon: faMusic,
   },
  { id: 7,
  icon: faFilm,
   },
  { id: 8,
  icon: faMoneyBill,
   },
  { id: 9,
  icon: faBook,
   },
  { id: 10,
  icon: faBroom,
   },
  { id: 11,
  icon: faAppleWhole,
   },
  { id: 12,
  icon: faHeartCirclePlus,
   },
{ id: 13,
icon: faClipboardList,
 },
  { id: 14,
  icon: faFaceSmile,
   },
  { id: 15,
  icon: faBullseye,
   },
  { id: 16,
  icon: faPersonShelter,
   },
  { id: 17,
  icon: faPeoplePulling,
   },
];


const HabitsList = styled(List)({
   '& .MuiListItemAvatar-root': {
    minWidth: 0,
  },
});

function HabitsShowcase({numOfCompletedHabits,areHabitsLoading, setAreHabitsLoading}){

const theme = useTheme()
// if user data => userdata.

const { myHabits } = useContext(UserContext)

const habitElements = myHabits.map(habit => {
    const commonHabit = habits.find((h) => h.name === habit.name)

    return (
<ListItem key={habit.name}>
<ListItemAvatar>
                    <Avatar
                    sx={{
                        bgcolor: 'transparent',
                        color: !habit.completed ? theme.palette.blackPrimary.main : theme.palette.darkGraySecondary.main,
                    }}
                    >
                    <FontAwesomeIcon icon={commonHabit.icon} />
                    </Avatar>
                  </ListItemAvatar>
<ListItemText primary={habit.name}
sx={{
    textDecoration: !habit.completed ? "none" : "line-through",
    color: !habit.completed ? theme.palette.blackPrimary.main : theme.palette.darkGraySecondary.main,
}}
/>
</ListItem>
)
})

    return (
        <Grid item container direction="column" justifyContent="center" alignItems="center" spacing={1}>
        <Grid item>
        <Typography variant="h5" component="p">My Habits</Typography>
       {areHabitsLoading ? <><CircularProgress/></> :
       <> <Typography variant="body2">Completed{" "} 
        {numOfCompletedHabits}/{myHabits.length}</Typography>
       <HabitsList>
      {habitElements}
    </HabitsList>
    </>
    }
    </Grid>
    </Grid>
    )
}

export default HabitsShowcase