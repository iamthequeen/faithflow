import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Button, Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListCheck, faLightbulb, faUser } from "@fortawesome/free-solid-svg-icons";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, useNavigate } from 'react-router-dom'
import Homepage from '../../pages/routes/Homepage/Homepage';
import HabitEditor from '../../pages/HabitEditor/HabitEditor';
import IdeasPage from '../../pages/routes/IdeasPage/IdeasPage';
import ProfilePage from '../../pages/routes/ProfilePage/ProfilePage';
import { FOOTER_STEPS } from "../../utils/formSteps"
import { FormStepContext } from "../../utils/FormStepContext";
import { useContext } from 'react';

const iconBtnData = [
    {
        id: 1,
        icon: faHome,
        link: "/myhome",
        name: "My Home",
        stepName: FOOTER_STEPS.HOME,
        stepValue: 'HOME_STEP',
        active: true,
    },
    {
        id: 2,
        icon: faListCheck,
        link: "/habits",
        name: "Habits",
        stepName: FOOTER_STEPS.HABITS,
        stepValue: 'HABITS_STEP',
        active: false
    },
    {
        id: 3,
        icon: faLightbulb,
        link: "/ideas",
        name: "Ideas",
        stepName: FOOTER_STEPS.IDEAS,
        stepValue: 'IDEAS_STEP',
        active: false
    },
    {
        id: 4,
        icon: faUser,
        link: "/profile",
        name: "Profile",
        stepName: FOOTER_STEPS.PROFILE,
        stepValue: 'PROFILE_STEP',
        active: false
    },
]


function Footer() {

    const theme = useTheme()

    const [value, setValue] = useState(0);

    const [active, setActive] = useState("My Home")

    const [navItems, setNavItems] = useState(iconBtnData);

    const { userStep, setUserStep } = useContext(FormStepContext)

    // useEffect(() => {
    //     console.log(active)
    // }, [active])

    //  put component to return in btn object

    // const [currentLink, setCurrentLink] = useState("/myhome")

    // useEffect(() => {
    //     navigate(currentLink)
    // }, [currentLink])


    const lightBlue = theme.palette.darkBluePrimary.main

    const navigate = useNavigate()

    const changeActiveNavItem = (index) => {
        const newNavItems = [...navItems];
        newNavItems.forEach((item, i) => {
            item.active = i === index;
        });

        setNavItems(newNavItems);
    };

    const changeActiveBtn = (btnName) => {
        setActive(btnName)
    }

    const iconBtns = navItems.map((navItem, index) => (
         userStep === navItem.stepValue ?
            <Button
            key={navItem.id}
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
                onClick={() => {
                    // setActive(navItem.name)
                    // changeActiveNavItem(index)
                    setUserStep(navItem.stepName)
                    }
                    }
            >
                <FontAwesomeIcon icon={navItem.icon} />
            </IconButton>
        //   </Link>
    ))

    const btns = navItems.map((navItem, index) => (
        <BottomNavigationAction
        value={index}
         key={navItem.id}

         sx={{
            color: active === navItem.name && lightBlue,
         }}
            onClick={() => {
                setValue(index)
                setActive(navItem.name)
                setUserStep(navItem.stepName) 
                changeActiveBtn(navItem.name)
                // console.log("hi")
                // return navItem.compon
                // setCurrentLink(navItem.link)
                // navigate(navItem.link)
            }}
            label={navItem.name} icon={<FontAwesomeIcon icon={navItem.icon} size="xl" color={`${value === index ? lightBlue : "gray"}`} />} />
    ))
    return (
        <Box sx={{ flexGrow: 1, position: "fixed", top: 'auto', bottom: 0, left: 0, right: 0 }}>
           <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, display: "flex", alignItems: "center",
        bgcolor: theme.palette.whiteTertiary.main,
         }}>
        <Toolbar
        sx={{
gap: "1rem",
        }}
        >
          {iconBtns}
        </Toolbar>
      </AppBar> 
           {/*   <BottomNavigation
                showLabels
                value={value}
                onChange={(event, value) => {
                    setValue(value);
                    console.log(value)
                }}
            >
                {btns}
            </BottomNavigation>*/}
        </Box>
    )
}

export default Footer
