import { Box, Grid, Typography, Tabs, Tab, List, ListItem, ListItemText, ListItemButton, useTheme, Stack, Chip } from '@mui/material';
import React, {useState, useEffect} from 'react';
import {db} from "../../utils/firebaseSetup"
import { getDocs, collection } from "firebase/firestore"


function IdeasListItems(props) {
    const {children, value, index, ...other} = props

    const theme = useTheme()

    // const [tabValue, setTabValue] = useState(0)

    // const handleTabChange = (newTabValue) => {
    //     setTabValue(newTabValue)
    // }



    const ideasCollectionRef = collection(db, "ideas")

    useEffect(() => {
        const getIdeasList = async () => {
            try {
                // const ideasData = await getDocs(ideasCollectionRef) 
                // const filteredIdeasData = ideasData.docs.map(doc => ({...doc.data(), id: doc.id,}))
                // setIdeasList(filteredIdeasData)
                // console.log(filteredIdeasData)
            } catch (err){
                console.error(err)
            }
        }

        getIdeasList()
    })

    

    return (
        <>
   
    

<div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
     {/* <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div> */}
        </>
    )
}

export default IdeasListItems;