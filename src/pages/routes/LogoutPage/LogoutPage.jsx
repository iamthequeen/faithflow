import React, {useContext, useEffect} from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header/Header";
import { UserContext } from "../../../utils/UserContext";
import "./LogoutPage.css"
import { useNavigate } from 'react-router-dom';



function LogoutPage() {
    const theme = useTheme()

    const {setJustLoggedOut} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
      const pageDurationTimer = setTimeout(() => {
        navigate("/")
        setJustLoggedOut(false)
        }, [3500])

        return () => clearTimeout(pageDurationTimer)
    })

    return (
        <>
      {/*  <Header/> */}
        <Box component="main" 
    sx={{
      paddingTop: "6rem",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      background: `linear-gradient(44.1deg, ${theme.palette.whitePrimary.main} 36.52%, ${theme.palette.bluePrimary.main} 68.57%)`,
    }}
    >
    <div>
        <span className="wave">👋</span>
</div>
<h1>So sad to see you go!</h1>
<p>But I hope you've improved in some way. Enjoy the rest of your day!</p>
<p className="fading-in">(Changing....)</p>
        </Box>
        </>
    )
}

export default LogoutPage