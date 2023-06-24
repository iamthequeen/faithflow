import {createContext, useContext, useState} from "react"
import { STEPS, FOOTER_STEPS } from "./formSteps"

export const FormStepContext = createContext();

export const FormStepContextProvider = ({children}) => {
    const [ formStep, setFormStep ] = useState(STEPS.WELCOME)

        const [ userStep, setUserStep ] = useState(FOOTER_STEPS.HOME)


    const val = {
        formStep,
        setFormStep,
        userStep, setUserStep,
    }

    return <FormStepContext.Provider value={val}>{children}</FormStepContext.Provider>
}
