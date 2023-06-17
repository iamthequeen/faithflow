import React from 'react'
import { Box, Grid, Typography, useTheme, Button, TextField } from "@mui/material";
import './ErrorPage.css'
import { Link } from 'react-router-dom';


function ErrorPage() {

    const theme = useTheme()

    return (
       <>
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
        <div className="error-page">
    <div>
      {/*  h1(data-h1='400') 400
        p(data-p='BAD REQUEST') BAD REQUEST
        h1(data-h1='401') 401
        p(data-p='UNAUTHORIZED') UNAUTHORIZED
        h1(data-h1='403') 403
        p(data-p='FORBIDDEN') FORBIDDEN */}
        <h1 data-h1="404">404</h1>
        <p data-p="NOT FOUND">NOT FOUND</p>
       {/* h1(data-h1='500') 500
        p(data-p='SERVER ERROR') SERVER ERROR */}
    </div>
</div>
<div id="particles-js"></div>
<Link to="/" style={{
              color: "#000"
            }}>
            Go Back
            </Link>
{/* <a href="#">Go Back</a> */}
</Box>
</>
    )
}

export default ErrorPage