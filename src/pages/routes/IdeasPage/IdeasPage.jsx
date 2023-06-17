import { Box, Grid, Typography, List, ListItem, ListItemText, ListItemButton, useTheme, Stack, Chip } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Footer from "../../../components/Footer/Footer";
import IdeasList from "../../../components/IdeasList/IdeasList"
import Header from '../../../components/Header/Header';

function IdeasPage() {

    const theme = useTheme()

    // useEffect(() => {
    //     const getIdeasList = async () => {
    //         try {
    //             const ideasData = await getDocs(ideasCollectionRef) 
    //             const filteredIdeasData = ideasData.docs.map(doc => ({...doc.data(), id: doc.id,}))
    //             // setIdeasList(filteredIdeasData)
    //             // console.log(filteredIdeasData)
    //         } catch (err){
    //             console.error(err)
    //         }
    //     }

    //     getIdeasList()
    // })

    

    return (
        <>
        <Header/>
        <Box
        component="main" 
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
        <Grid container justifyContent="center"
alignItems="center" direction="column" spacing={4}>
<Grid item> 
 <IdeasList/> 
</Grid>

        </Grid>
        </Box>
        <Footer/>
        </>
    )
}

export default IdeasPage;