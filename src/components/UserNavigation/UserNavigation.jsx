import React, { useContext, useEffect } from "react";
import { getFooterStep } from "../../utils/helpers";
import { FormStepContext } from "../../utils/FormStepContext";
import Header from "../Header/Header";
import { UserContext } from "../../utils/UserContext";


function UserNavigation() {

    const { guestUser } = useContext(UserContext)
   
       const { userStep } = useContext(FormStepContext)

       useEffect(() => {
       if (guestUser) {
        const unloadCallback = (e) => {
          e.preventDefault()
          e.returnValue = ""
          return ""
        }

        window.addEventListener("beforeunload", unloadCallback)
        return () => window.removeEventListener("beforeunload", unloadCallback)}
       })

  return (
    <>
    <Header />
    {getFooterStep(userStep)} 
    </>
  );
}

export default UserNavigation;