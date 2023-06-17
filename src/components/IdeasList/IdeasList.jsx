import { Box, Grid, Typography, Tab, List, ListItem, ListItemText, ListItemButton, useTheme, Stack, Chip, Tabs } from '@mui/material';
import React, {useState, useEffect} from 'react';
import {db} from "../../utils/firebaseSetup"
import { getDocs, collection } from "firebase/firestore"
import IdeasListItems from '../IdeasListItems/IdeasListItems';
import {ideasList} from "../../utils/data"
import {habits} from "../../utils/helpers"



const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function IdeasList() {

    const theme = useTheme()

    const [value, setValue] = useState(0)

    const handleTabChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        console.log(value)
    }, [value])

      const storedStruggles = ["faith","spiritual growth","understanding"]
  const storedImprovements = ["volunteering","lifestyle","gratitude"]

  const storedStrugsAndImprovs = [...storedStruggles, ...storedImprovements]

    const [suggestedIdeas, setSuggestedIdeas] = useState([])

  const [isSuggestedEmpty, setIsSuggestedEmpty] = useState(true)



    const ideasCollectionRef = collection(db, "ideas")

    // useEffect(() => {
    //     const getIdeasList = async () => {
    //         try {
    //             // const ideasData = await getDocs(ideasCollectionRef) 
    //             // const filteredIdeasData = ideasData.docs.map(doc => ({...doc.data(), id: doc.id,}))
    //             // setIdeasList(filteredIdeasData)
    //             // console.log(filteredIdeasData)
    //         } catch (err){
    //             console.error(err)
    //         }
    //     }

    //     getIdeasList()
    // })

    const storedHabits = [
    {
      name: "Read the Bible",
    //   keyword: "read",
      completed: false,
    },
    {
      name: "Pray for at least 1 minute",
    //   keyword: "prayer",
      completed: false,
    },
    {
      name: "Attend church",
    //   keyword: "church",
      completed: false,
    },
    {
      name: "Write down 3 things I'm grateful for",
    //   keyword: "gratitude",
      completed: false,
    },
  ]

  useEffect(() => {
    const filteredIdeas = ideasList.filter((idea) =>
      idea.tags.some((tag) => storedStrugsAndImprovs.includes(tag))
    );
    setSuggestedIdeas(filteredIdeas);
    setIsSuggestedEmpty(false)
  }, []);


  const renderIdeasBtns = (list, listName) => {
   return list.map(idea => (
      <ListItem key={`${listName}${idea.id}`}>
  <ListItemButton
  href={idea.websiteUrl}
  rel="noopener noreferrer"
  target="_blank"
  sx={{
  border: `2px solid ${theme.palette.whiteTertiary.main}`,
    "&:hover": {
    bgcolor: theme.palette.whiteTertiary.main,
    }
  }}
  >
  <img src={`/images/thumbnail/${idea.mainTopic}.png`} alt="" style={{
            width: "7rem",
            height: "7rem",
          }} />
  <Box
  sx={{
          margin: "0.5rem",
        }}
  >
  <ListItemText 
  primary={idea.title}
  secondary={`Type: ${idea.type}`}
  />
  <Stack direction="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          sx={{
            gap: "0.35rem",
          }}>
          {idea.tags.map(tag => {
        //     if (composer.era === 'Renaissance'){
        //       setColor('red')
        // }
        // if (composer.era === 'Baroque'){
        //       setColor('blue')
        // }
        // storedStrugsAndImprovs.forEach(word => word === tag ? setTagColor("green") : "gray") 
           return <Chip size="small" key={tag} label={tag}
              sx={{
                // bgcolor: "blue"
                bgcolor: listName === "suggested" && storedStrugsAndImprovs.includes(tag) ? theme.palette.greenPrimary.main : theme.palette.lightGrayPrimary.main
              }}
              />}
        )}
  </Stack>
  </Box>
  </ListItemButton>
  </ListItem>
  ))
  
  }

    const fullIdeasBtns = ideasList.map(idea => (
        <ListItem key={idea.id}>
<ListItemButton
href={idea.websiteUrl}
rel="noopener noreferrer"
target="_blank"
sx={{
    border: `2px solid ${theme.palette.whiteTertiary.main}`,
    "&:hover": {
    bgcolor: theme.palette.whiteTertiary.main,
    }
}}
>
<img src={`/images/thumbnail/${idea.mainTopic}.png`} alt="" style={{
            width: "7rem",
            height: "7rem",
          }} />
<Box
sx={{
            margin: "0.5rem",
          }}
>
<ListItemText 
sx={{

}}
primary={idea.title}
secondary={`Type: ${idea.type}`}
/>
<Stack direction="row"
            flexWrap="wrap"
            justifyContent="flex-start"
            sx={{
              gap: "0.35rem",
            }}>
            {idea.tags.map(tag => (
                <Chip size="small" key={tag} label={tag} color="lightGrayPrimary" />
            ))}
</Stack>
</Box>
</ListItemButton>
</ListItem>
    ))

  
    return (
        <>
   
    <Box
    sx={{
        borderBottom: 1, borderColor: 'divider',
    }}
    >
    <Tabs
    aria-label="Ideas Tabs"
    value={value}
    onChange={handleTabChange}
    textColor="secondary"
    variant="fullWidth"
    indicatorColor="secondary"
    >
    <Tab label="Suggested" {...a11yProps(0)}></Tab>
    <Tab label="All" {...a11yProps(0)}></Tab>
    </Tabs>
{/* <List>
{ideasBtns}
</List> */}

</Box>
<IdeasListItems value={value} index={0}>
{isSuggestedEmpty ? <div>loading....</div> :
      renderIdeasBtns(suggestedIdeas, "suggested")}
</IdeasListItems>
<IdeasListItems value={value} index={1}>
{renderIdeasBtns(ideasList, "all")}
</IdeasListItems>
        </>
    )
}

export default IdeasList;