import { Box, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import Clock from '../../../components/ui/Clock/Clock';
import Footer from "../../../components/Footer/Footer";


function IdeasPage() {

    return (
        <>
        <Box
        component="main" 
    sx={{
      paddingTop: "1.5rem",
      paddingBottom: "7rem",
      minHeight: "100vh",
      textAlign: "center",
      background: `linear-gradient(195.41deg, rgba(186, 207, 255, 0.67) 27.63%, #FFCEB7 74.14%)`,
    }}
        >
        <Grid container justifyContent="center"
alignItems="center" direction="column" spacing={4}>
<Grid item> 
<Clock/>
</Grid>

<Grid item>
<Typography component="h1" variant="h5">Ideas page is coming soon.<br/> Stay Tuned!</Typography>
</Grid>

<Grid item>
<Typography variant="body1" color="black">Will contain curated recommendations based on your struggles, habits, and desired improvements.</Typography>
</Grid>
        </Grid>
        </Box>
        <Footer/>
        </>
    )
}

export default IdeasPage;