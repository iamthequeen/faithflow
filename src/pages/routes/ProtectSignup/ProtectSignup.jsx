import React, {useContext} from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../../../utils/UserContext';


function ProtectSignup({children}) {

    const {
        guestUser
    } = useContext(UserContext)


  if (!guestUser) {
    return <Navigate to="/" replace />;
  }

  return children;

}

export default ProtectSignup;