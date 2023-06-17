import React, {useContext} from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../../../utils/UserContext';
import { auth } from '../../../utils/firebaseSetup';


function ProtectedRoute({children}) {

    const {
        guestUser
    } = useContext(UserContext)


//   if (!auth?.currentUser || !guestUser) {
//     return <Navigate to="/" replace />;
//   }

//   return children;

  if (auth?.currentUser || guestUser) {
    return children;
  }

  return <Navigate to="/" replace />;


}

export default ProtectedRoute;