import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {IconButton, Button, Box, Typography} from '@mui/material';
import { useTheme } from '@emotion/react';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListCheck, faLightbulb, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom'

const iconBtnData = [
    {
        id: 1,
        icon: faHome,
        name: "Home",
        active: false,
    },
    {
        id: 2,
        icon: faListCheck,
        name: "Habits",
        active: false
    },
    {
        id: 3,
        icon: faLightbulb,
        name: "Ideas",
        active: false
    },
    {
        id: 4,
        icon: faUser,
        name: "Profile",
        active: false 
    },
   ]


function Footer(){

    const theme = useTheme()
    


 const [navItems, setNavItems] = useState(iconBtnData);

   const changeActiveNavItem = (index) => {
    const newNavItems = [...navItems];
    newNavItems.forEach((item, i) => {
      item.active = i === index;
    });

    setNavItems(newNavItems);
  };

    const iconBtns = navItems.map((navItem, index) => (
        navItem.active ?  
        <Button
        sx={{
            transition: "all 0.3s ease-out",
            border: "none",
            // borderRadius: "0.5rem",
            bgcolor: theme.palette.lightYellowPrimary.main, 
            color: theme.palette.darkGraySecondary.main, 
            "&:hover": {
                border: "none",
                bgcolor: theme.palette.lightYellowPrimary.main, 
                cursor: "default",
            }
        }}
         variant="outlined" startIcon={<FontAwesomeIcon icon={navItem.icon} color="inherit" />}>
        <Typography variant="subtitle"
        sx={{
            transition: "left .25s"
        }}
        >
        {navItem.name}
        </Typography>
</Button>
        :
        // <Link>
        <IconButton key={navItem.id}
        sx={{
            transition: "all 0.3s ease-out",
            // bgcolor: navItem.active ? "orange" : "pink",
             color: "#999",
  padding: "5px 15px",
  textAlign: "center",
  borderRadius: "4px",
            "&:hover": {
                bgcolor: theme.palette.lightYellowPrimary.main, 
            }
        }}
        onClick={() => changeActiveNavItem(index)}
        >
        <FontAwesomeIcon icon={navItem.icon}/>
          </IconButton>
        //   </Link>
    ))

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, display: "flex", alignItems: "center",
        bgcolor: theme.palette.whiteTertiary.main,
         }}>
        <Toolbar
        sx={{
gap: "1rem",
//  color: "#999",
//   padding: "10px 15px",
//   textAlign: "center",
//   borderRadius: "5px",
        }}
        >
          {iconBtns}
        </Toolbar>
      </AppBar>
      </Box>
    )
}

export default Footer