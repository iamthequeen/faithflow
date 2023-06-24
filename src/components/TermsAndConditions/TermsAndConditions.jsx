import React, {useContext, useEffect} from 'react'
import { Box, Grid, Typography, styled, useTheme, IconButton,Button, TextField, List, ListItem } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FormStepContext } from "../../utils/FormStepContext";
import { FOOTER_STEPS } from "../../utils/formSteps"

const Para = styled(Typography)({
padding: "1rem 0",
})

function TermsAndConditions() {

    const { setUserStep } = useContext(FormStepContext)



    return (
         <Box component="main" 
    sx={{
     padding: "7rem 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      background: `linear-gradient(195.41deg, rgba(186, 207, 255, 0.67) 27.63%, #FFCEB7 74.14%)`,
    }}
    >
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={4}>
     <Grid container item justifyContent="center" alignItems="center"
        spacing={3}
        >
        <Grid item>
        <IconButton
        onClick={() => {
            setUserStep(FOOTER_STEPS.PROFILE)
        }}
        >
        <FontAwesomeIcon icon={faChevronLeft} color="black" size="xs"/>
        </IconButton>
        </Grid>
        <Grid item>
        <Typography 
        variant="h5" component="h1" sx={{
    fontWeight: 400,
}}>Terms of Use for FaithFlow</Typography>
</Grid>
        </Grid>
        <Grid item>
        <Box 
      sx={{
        margin: "auto",
        textAlign: "justify",
    position: "relative",
    maxWidth: "27rem",

      }}
      >

<Para variant="body1">
Welcome to FaithFlow, a Christian habit tracker designed to help you grow in your faith and cultivate positive habits. By accessing and using FaithFlow, you agree to comply with the following terms and conditions:
</Para>
<Para variant="body1">
Acceptance of Terms: By using FaithFlow, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
</Para>
<Para variant="body1">
User Responsibilities: You are solely responsible for your use of FaithFlow and the habits you track. You agree to use FaithFlow in a manner consistent with Christian values and principles.
</Para>
<Para variant="body1">
Privacy: We respect your privacy and handle your personal information in accordance with our Privacy Policy. By using FaithFlow, you consent to the collection, storage, and processing of your personal data as outlined in the Privacy Policy.
</Para>
<Para variant="body1">
Account Registration: To access certain features of FaithFlow, you may be required to create an account. You are responsible for providing accurate and up-to-date information during the registration process. You must safeguard your account credentials and not share them with others.
</Para>
<Para variant="body1">
User Content: By using FaithFlow, you may have the opportunity to contribute user-generated content such as habit tracking data, comments, or feedback. You retain ownership of your content but grant FaithFlow a non-exclusive, worldwide, royalty-free license to use, modify, and distribute your content for the purpose of providing and improving FaithFlow.
</Para>
<Para variant="body1">
Prohibited Activities: You agree not to engage in any activities that may:
</Para>
<List>
<ListItem>a. Violate any applicable laws, regulations, or third-party rights.</ListItem>
<ListItem>b. Interfere with the proper functioning of FaithFlow or its infrastructure.</ListItem>
<ListItem>c. Impersonate any person or entity or misrepresent your affiliation with any person or entity.</ListItem>
<ListItem>d. Transmit any viruses, malware, or other harmful code.</ListItem>
<ListItem>e. Engage in any form of abusive, harassing, or offensive behavior towards others.</ListItem>
</List>
<Para variant="body1">
Intellectual Property: FaithFlow and its content, including but not limited to logos, graphics, and text, are protected by intellectual property laws. You may not use, reproduce, or distribute any portion of FaithFlow's content without prior written permission.
</Para>
<Para variant="body1">
Disclaimer of Warranties: FaithFlow is provided on an "as is" and "as available" basis. We do not warrant that FaithFlow will be uninterrupted, error-free, or free from viruses or other harmful components.
</Para>
<Para variant="body1">
Limitation of Liability: In no event shall FaithFlow or its creators be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of FaithFlow.
</Para>
<Para variant="body1">
Modification of Terms: We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on FaithFlow. Your continued use of FaithFlow after the modifications will signify your acceptance of the updated terms.
</Para>
<Para variant="body1">
Termination: We may, at our discretion, suspend or terminate your access to FaithFlow if you violate these terms and conditions.
</Para>
<Para variant="body1">
Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of the U.S.
</Para>
<Para variant="body1">
If you have any questions or concerns regarding these terms and conditions, please contact us!
</Para>
</Box>
</Grid>
</Grid>
</Box>
    )
}

export default TermsAndConditions
