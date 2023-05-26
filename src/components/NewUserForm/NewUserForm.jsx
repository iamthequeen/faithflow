import React, { useContext, useEffect } from "react";
import { getCurrentFormStep } from "../../utils/helpers";
import { FormStepContext } from "../../utils/FormStepContext";
import Header from "../Header/Header";

function NewUserForm() {
   
       const { formStep } = useContext(FormStepContext)

       useEffect(() => {
        const unloadCallback = (e) => {
          e.preventDefault()
          e.returnValue = ""
          return ""
        }

        window.addEventListener("beforeunload", unloadCallback)
        return () => window.removeEventListener("beforeunload", unloadCallback)
       })

  return (
    <>
    <Header />
    {getCurrentFormStep(formStep)} 
    </>
  );
}

export default NewUserForm;
