import React, { useContext, useEffect } from "react";
import { getCurrentFormStep } from "../../utils/helpers";
import { FormStepContext } from "../../utils/FormStepContext";
import { UserContext } from "../../utils/UserContext";
import Header from "../Header/Header";
import { STEPS } from "../../utils/formSteps";


function NewUserForm() {
   
       const { formStep } = useContext(FormStepContext)

        const { guestUser } = useContext(UserContext)

       useEffect(() => {
       if (formStep !== STEPS.WELCOME) {
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
    {getCurrentFormStep(formStep)} 
    </>
  );
}

export default NewUserForm;
