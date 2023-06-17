import React, {useState, useContext, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Grid, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Image } from 'mui-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ConfirmLogoutModal from "../ConfirmLogoutModal/ConfirmLogoutModal"
import { UserContext } from "../../utils/UserContext"
import { auth } from "../../utils/firebaseSetup"


const drawerWidth = 240;
const navItemsIfSignedOut = [
  {
    id: 1,
    name: 'Become a User',
    link: '/newuser',
  },
  {
    id: 2,
    name: 'Log In',
    link: '/login',
  }, ];

  const navItemsIfSignedIn = [
  {
    id: 1,
    name: 'My Home',
    link: '/myhome',
  },
  {
    id: 2,
    name: 'Log Out',
    link: '/logout',
  }, ];

function Header(props) {
    const { window } = props

    const {currentUser, guestUser, logout, setJustLoggedOut} = useContext(UserContext)

     const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleOpenModal = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseModal = () => {
    setOpenConfirmModal(false);
  };

    const [currentNav, setCurrentNav] = useState(navItemsIfSignedOut)


    const navigate = useNavigate()
    const location = useLocation()

    // const handleNav = () => {
    //   !currentUser ? setCurrentNav(navItemsIfSignedOut) : setCurrentNav(navItemsIfSignedIn)
    // }



useEffect(() => {
    (auth?.currentUser || guestUser) ? setCurrentNav(navItemsIfSignedIn) : setCurrentNav(navItemsIfSignedOut)

    // handleNav()
}, [currentUser])


    const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',  }}>
<Box
sx={{
    paddingTop: "1rem",
}}
>
    <img src="/images/faithflow-logo.png" alt="" width="150" height="115" />
    </Box>
      <Typography variant="h6" sx={{ my: 2 }}>
      <Link to="/" style={{
              textDecoration: "none",
              color: "#000"
            }}>
            faithflow
            </Link>
      </Typography>
      <List>
        {currentNav.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton to={item.name !== "Log Out" ? item.link : ""} sx={{ textAlign: 'center',
            "&:hover": {
            bgcolor: theme.palette.lightBluePrimary.main,
            } }}
            onClick={(() => {
                if (item.name === "Log Out") {
                handleOpenModal()
                }
            //     if (item.name === "Log Out" && confirmLogout) {
            //         try {
            //         logout()
            //         setJustLoggedOut(true)
            //         navigate("/logout")
            //         // setConfirmLogout(false)
            //    } catch(err) {
            //     alert(err)
            //    }
            //     }
                // setConfirmLogout(false)
            })}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav"
      sx={{
        bgcolor: theme.palette.lightBluePrimary.main,
        boxShadow: "none"
      }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: location.pathname !== "/myhome" && { sm: 'none' } }}
          >
            <FontAwesomeIcon icon={faBars}/>
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: location.pathname === "/myhome" ? "none" : { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" style={{
              textDecoration: "none",
              color: "#fff"
            }}>
            faithflow
            </Link>
          </Typography>
          
          <Box sx={{ display: location.pathname === "/myhome" ? "none" : { xs: 'none', sm: 'block' } }}>
            {currentNav.map((item) => (
              <Link to={item.name !== "Log Out" ? item.link : ""} key={item.id} 
              onClick={(() => {
                  if (item.name === "Log Out") {
                handleOpenModal()
                }
            //     if (item.name === "Log Out" && confirmLogout) {
            //         try {
            //         logout()
            //         setJustLoggedOut(true)
            //         navigate("/logout")
            //         // setConfirmLogout(false)
            //    } catch(err) {
            //     alert(err)
            //    }
            //     }
            //     setConfirmLogout(false)
            })}
               >
                <Button color="darkBluePrimary" sx={{ color: '#fff', marginRight: "0.5rem" }}
                 >
                
                {item.name}
              </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: location.pathname === "/myhome" ? "block" : { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <ConfirmLogoutModal
      openConfirmModal={openConfirmModal}
      handleCloseModal={handleCloseModal}
      />
    </Box>
  );
}
export default Header;