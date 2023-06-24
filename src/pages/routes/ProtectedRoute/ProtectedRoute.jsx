import React, {useContext} from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../../../utils/UserContext';
import { FormStepContext } from "../../../utils/FormStepContext";
import { FOOTER_STEPS } from "../../../utils/formSteps";
import { auth } from '../../../utils/firebaseSetup';
import {useLocation} from 'react-router-dom'
import LoadingScreen from "../../../components/ui/LoadingScreen/LoadingScreen";


function ProtectedRoute({children}) {

    const {
        guestUser, currentUser
    } = useContext(UserContext)

     const {
        setUserStep
    } = useContext(UserContext)

    let location = useLocation()
    //   let from = location.state?.from?.pathname || "/";



if (currentUser || guestUser ) {
    // if (location.pathname === "/myhome") {
    // setUserStep(FOOTER_STEPS.HOME)
    // }
    return children;
  }

//   return <Navigate to="/" replace />;
return <Navigate to="/" replace />;
  

//   if (auth?.currentUser || guestUser) {
//     return children;
//   }

//   return <Navigate to={from} state={{ from: location }} replace />;


}

export default ProtectedRoute;
