import React, {useState} from 'react';
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
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
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

function Header(props) {
    const { window } = props

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
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton to={item.link} sx={{ textAlign: 'center',
            "&:hover": {
            bgcolor: theme.palette.lightBluePrimary.main,
            } }}>
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
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FontAwesomeIcon icon={faBars}/>
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" style={{
              textDecoration: "none",
              color: "#fff"
            }}>
            faithflow
            </Link>
          </Typography>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link to={item.link} key={item.id}>
                <Button color="darkBluePrimary" sx={{ color: '#fff', marginRight: "0.5rem" }}>
                
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default Header;