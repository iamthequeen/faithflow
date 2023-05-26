import {createContext, useContext, useState} from "react"
import { STEPS } from "./formSteps"

export const FormStepContext = createContext();

export const FormStepContextProvider = ({children}) => {
    const [ formStep, setFormStep ] = useState(STEPS.WELCOME)

    const val = {
        formStep,
        setFormStep
    }

    return <FormStepContext.Provider value={val}>{children}</FormStepContext.Provider>
}