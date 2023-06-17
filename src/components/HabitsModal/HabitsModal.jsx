import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import HabitTrackerPage from '../../pages/HabitTrackerPage/HabitTrackerPage';

function HabitsModal({ open, handleClose }) {
    const theme = useTheme()

    return (
        <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(44.1deg, ${theme.palette.whitePrimary.main} 36.52%, ${theme.palette.bluePrimary.main} 68.57%)`
        //   bgcolor: theme.palette.lightBluePrimary.main,
        }}
        // onSubmit={handleSubmit(onSubmit)}
      >
        {/*<DialogTitle>
          Edit Habits
        </DialogTitle>*/}
        
        <DialogContent>
       <HabitTrackerPage handleClose={handleClose} />
        </DialogContent>
      </Box>
    </Dialog>
    )
}

export default HabitsModal