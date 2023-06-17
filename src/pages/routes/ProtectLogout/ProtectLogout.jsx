import React, {useContext} from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../../../utils/UserContext';


function ProtectLogout({children}) {

    const {
        justLoggedOut
    } = useContext(UserContext)


  if (!justLoggedOut) {
    return <Navigate to="/" replace />;
  }

  return children;

}

export default ProtectLogout;