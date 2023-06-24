 import { Box, Grid, Typography, Tab, List, ListItem, ListItemText, ListItemButton, useTheme, Stack, Chip, Tabs } from '@mui/material';
import React, {useState, useEffect, useContext} from 'react';
import {db} from "../../utils/firebaseSetup"
import { getDocs, collection } from "firebase/firestore"
import IdeasListItems from '../IdeasListItems/IdeasListItems';
import {UserContext} from "../../utils/UserContext"
import {Link} from 'react-router-dom'
import {auth} from "../../utils/firebaseSetup"




const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function IdeasList() {

    const theme = useTheme()

    const { guestUser, currentUser, userData } = useContext(UserContext)

    const [value, setValue] = useState(0)
    const [allIdeasLoading, setAllIdeasLoading] = useState(true)
    const [ideasList, setIdeasList] = useState([])

    const handleTabChange = (event, newValue) => {
        setValue(newValue)
    }

   

//       const storedStruggles = userData.struggles
//   const storedImprovements = userData.desiredImprovements

//   const storedStrugsAndImprovs = userData ? [...storedStruggles, ...storedImprovements] : []

const storedStruggles = userData.struggles
const storedImprovements = userData.desiredImprovements

  const storedStrugsAndImprovs = [...storedStruggles, ...storedImprovements]


    const [suggestedIdeas, setSuggestedIdeas] = useState([])

  const [isSuggestedEmpty, setIsSuggestedEmpty] = useState(true)


    const ideasCollectionRef = guestUser ? collection(db, "limitedIdeas") : collection(db, "ideas")

     const getIdeasList = async () => {
            try {
                const ideasData = await getDocs(ideasCollectionRef) 
                const filteredIdeasData = ideasData.docs.map(doc => ({...doc.data(), id: doc.id,}))
                setIdeasList(filteredIdeasData)
                setAllIdeasLoading(false)
            } catch (err){
                console.error(err)
            }
        }

    useEffect(() => {
        if (allIdeasLoading) {
        getIdeasList()
        } 
    }, [allIdeasLoading])

    const populateSuggestedIdeas = () => {
const filteredIdeas = ideasList.filter((idea) =>
      idea.tags.some((tag) => storedStrugsAndImprovs.includes(tag))
    );
    setSuggestedIdeas(filteredIdeas);
    setIsSuggestedEmpty(false)
    }

  useEffect(() => {
    if(currentUser && isSuggestedEmpty && ideasList.length !== 0) {
populateSuggestedIdeas()
    }
    
  }, [ideasList, isSuggestedEmpty, currentUser]);



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

           return <Chip size="small" key={tag} label={tag}
              sx={{
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

//     const fullIdeasBtns = ideasList.map(idea => (
//         <ListItem key={idea.id}>
// <ListItemButton
// href={idea.websiteUrl}
// rel="noopener noreferrer"
// target="_blank"
// sx={{
//     border: `2px solid ${theme.palette.whiteTertiary.main}`,
//     "&:hover": {
//     bgcolor: theme.palette.whiteTertiary.main,
//     }
// }}
// >
// <img src={`/images/thumbnail/${idea.mainTopic}.png`} alt="" style={{
//             width: "7rem",
//             height: "7rem",
//           }} />
// <Box
// sx={{
//             margin: "0.5rem",
//           }}
// >
// <ListItemText 
// sx={{

// }}
// primary={idea.title}
// secondary={`Type: ${idea.type}`}
// />
// <Stack direction="row"
//             flexWrap="wrap"
//             justifyContent="flex-start"
//             sx={{
//               gap: "0.35rem",
//             }}>
//             {idea.tags.map(tag => (
//                 <Chip size="small" key={tag} label={tag} color="lightGrayPrimary" />
//             ))}
// </Stack>
// </Box>
// </ListItemButton>
// </ListItem>
//     ))

  
    return (
        <>
 { guestUser ? 
 <Box>
 <Typography component="h1" variant="h3"
 sx={{
    textDecoration: "underline",
 }}
 >All</Typography>
 <Box> 
{allIdeasLoading ? <div>Loading...</div> : renderIdeasBtns(ideasList, "all")}
 </Box>
 {allIdeasLoading ? <Box/> : 
<>
<Typography variant="h6" component="p">Want a more extended list and even suggested ideas? <Link
style={{
              color: "#000"
            }}
 to="/signup">Create an account</Link>!</Typography>
</>}
 </Box> 
 :      
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
{allIdeasLoading ? <div>Loading...</div> : renderIdeasBtns(ideasList, "all")}
</IdeasListItems>
        </>
        }
        </>
    )
}

export default IdeasList;
