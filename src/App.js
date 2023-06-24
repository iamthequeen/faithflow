  import React, { useContext, useEffect } from "react";
import { Box, Button, ButtonGroup, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { getCurrentFormStep } from "./utils/helpers";
import { UserContext } from "./utils/UserContext";
import LoadingScreen from "./components/ui/LoadingScreen/LoadingScreen";
import NewUserForm from "./components/NewUserForm/NewUserForm"
import HabitTrackerPage from "./pages/HabitTrackerPage/HabitTrackerPage"
import Homepage from "./pages/routes/Homepage/Homepage"
import IdeasPage from "./pages/routes/IdeasPage/IdeasPage"
import LogoutPage from "./pages/routes/LogoutPage/LogoutPage"
import LandingPage from "./pages/routes/LandingPage/LandingPage"
import ProfilePage from "./pages/routes/ProfilePage/ProfilePage"
import HabitEditor from "./pages/HabitEditor/HabitEditor";
import { Route, Routes } from 'react-router-dom'
import AccountSettings from "./components/AccountSettings/AccountSettings";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import ErrorPage from "./pages/routes/ErrorPage/ErrorPage";
import ProtectLogout from "./pages/routes/ProtectLogout/ProtectLogout";
import ProtectedRoute from "./pages/routes/ProtectedRoute/ProtectedRoute";
import ProtectSignup from "./pages/routes/ProtectSignup/ProtectSignup";
import UserNavigation from "./components/UserNavigation/UserNavigation";
import {useLocation} from 'react-router-dom'


function App() {

    // const {
    //     justLoggedOut, setJustLoggedOut
    // } = useContext(UserContext)

    const theme = createTheme({
         typography: {
      button: {
        fontWeight: 400,
        textTransform: "none",
      },
    },
        components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#000",
          },
        },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            width: "40px",
            height: "40px",
          },
        },
      },
    //   MuiBottomNavigationAction: {
    //     styleOverrides: {
    //       root: {
    //         '& .Mui-selected': {
    //       color: '#655FB1',
    //     },
    //       },
    //     },
    //   },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            transition: "none",
            "&:hover": {
              backgroundColor: "#090c9b",
            },
          },
        },
      },
    },
        palette: {
            mode: "light",
            blackPrimary: {
                main: "#000",
                contrastText: "#FFF",
            },
            whitePrimary: {
                main: "#FFF",
                contrastText: "#000"
            },
            whiteSecondary: {
                main: "#FFECE0",
                contrastText: "#000"
            },
            bluePrimary: {
                main: "rgba(186, 207, 255, 0.74)",
                contrastText: "#000"
            },
            lightBluePrimary: {
                main: "#A5C8E4",
                contrastText: "#000"
            },
            darkBluePrimary: {
                main: "#655FB1",
                contrastText: "#fff"
            },
            darkBlueSecondary: {
                main: "#0E133C",
                light: "#26339e",
                contrastText: "#fff"
            },
            darkGrayPrimary: {
                main: "#454545",
                contrastText: "#fff"
            },
            darkGraySecondary: {
                main: "#787878",
                dark: "#2f2f2f",
                contrastText: "#fff"
            },
            lightGrayPrimary: {
                main: "#d2d2d2",
                contrastText: "#000"
            },
            whiteTertiary: {
                main: "#F6F6F6",
                contrastText: "#000"
            },
            lightBlueSecondary: {
                dark: "#0E133C",
                main: "#26339e",
                contrastText: "#fff"
            },
            pinkPrimary: {
                main: "#DFC4C2",
                contrastText: "#000"
            },
            orangePrimary: {
                main: "#F9B964",
                contrastText: "#000"
            },
            redPrimary: {
                main: "#FF0000",
                contrastText: "#000"
            },
            lightGreenPrimary: {
                main: "#8CE6A5",
                contrastText: "#000",
            },
            greenPrimary: {
                main: "#4FDE65",
                contrastText: "#000",
            },
            yellowPrimary: {
                main: "#FFDF02",
                contrastText: "#000",
            },
            lightYellowPrimary: {
                main: "#FFE598",
                contrastText: "#000",
            },
            beigePrimary: {
              main: "#f4eed7",
              contrastText: "#000",
          },
            text: {
        primary:"#000"
      },
        }
    })



  return (
    <ThemeProvider theme={theme}>
     <CssBaseline>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            left: 0,
            top: 0,
            minHeight: "100vh",
            width: "100vw",
            background: "#000",
          }}
        >

  <Routes>
         
         <Route exact={true} path="/" element={<LandingPage />}/>
          
         <Route path="/newuser" element={<NewUserForm/>} />
          
         
         <Route path="/login" element={<LoginForm/>} />

         <Route path="/logout" element={
            <ProtectLogout>
            <LogoutPage/>
            </ProtectLogout>} />

            <Route path="/signup" element={
            <ProtectSignup>
            <SignupForm/>
            </ProtectSignup>} />
           

            <Route path="/myhome" element={
            <ProtectedRoute>
            <UserNavigation/>
            </ProtectedRoute>} />


         <Route path="*" element={<ErrorPage />}/>

         </Routes>
         
        </Box>
        </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
