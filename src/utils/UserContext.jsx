import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseSetup";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faBookBible, faHandsPraying, faChurch } from "@fortawesome/free-solid-svg-icons";
import LoadingScreen from "../components/ui/LoadingScreen/LoadingScreen";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  //   User Info
 
 const [userFirstName, setUserFirstName] = useState("Guest");

  const [guestUser, setGuestUser] = useState(false);

const [currentUser, setCurrentUser] = useState(null);

const [justLoggedOut, setJustLoggedOut] = useState(false);

const [isHabitCompletionUpdate, setIsHabitCompletionUpdate] = useState(null)



 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
        

      setCurrentUser(user ? user : null)
      
    // setCurrentUser(user)
    })
    return () => {
      unsubscribe()
    //   console.log(currentUser)
    }
  })


 



  const [ personalStruggles, setPersonalStruggles ] = useState([])

  const [ personalImprovements, setPersonalImprovements ] = useState([])

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    uid: "",
    struggles: [],
    desiredImprovements: [],
  })

    const [myHab1, setMyHab1] = useState({})
  const [myHab2, setMyHab2] = useState({})
  const [myHab3, setMyHab3] = useState({})


const [ myHabits, setMyHabits ] = useState([
//   { id: 1, name: 'Read the Bible', 
//   description: "Reading the Bible daily can deepen your relationship with God, increase knowledge and understanding of His word, and provide guidance and comfort in daily life.",
//   icon: <FontAwesomeIcon icon={faBookBible} />,
//   completed: false, },
//   { id: 2, name: 'Pray for at least 1 minute', 
//   description: "Prayer is a powerful way to connect with God, seek His guidance, and express gratitude. Praying daily for at least 1 minute can help build a habit of consistent communication with God.",
//   icon: <FontAwesomeIcon icon={faHandsPraying} />,
//   completed: false, },
//   { id: 3, name: 'Attend church', 
//   description: "Attending church services can provide a sense of community and fellowship with other believers, provide opportunities for worship and learning, and encourage accountability and growth in one's faith.",
//   icon: <FontAwesomeIcon icon={faChurch} />,
//   completed: false, },
])

const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    };

    const login = (email, password) => {
   return signInWithEmailAndPassword(auth ,email, password)
  }

//   const updateUserInfo = (fullName) => {
//     return updateProfile()
//   }

//   useEffect(() => {
//     const observeCurrentUser = onAuthStateChanged(auth, user => {
// setCurrentUser(user)
//     })
//     return () => {
//         observeCurrentUser()
//         console.log(currentUser)
//     }
//   }, [])


  const logout = () => {
    if (guestUser) {
        setGuestUser(false)
    } else {
    return signOut(auth)
    }
  }

  const [hasDoneNewUserFormBefore, setHasDoneNewUserFormBefore] = useState(false)

// Confirm Logout Modal

     const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleOpenModal = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseModal = () => {
    setOpenConfirmModal(false);
  };

  // Values
  const val = {
    userFirstName, setUserFirstName,
    personalStruggles, setPersonalStruggles,
    personalImprovements, setPersonalImprovements,
    currentUser, 
    userData, setUserData,
    guestUser, setGuestUser,
    createAccount,
    justLoggedOut, setJustLoggedOut,
    login,
    logout,
    myHabits, setMyHabits,
    myHab1, setMyHab1,
    myHab2, setMyHab2,
    myHab3, setMyHab3,
    hasDoneNewUserFormBefore, setHasDoneNewUserFormBefore,
    isHabitCompletionUpdate, setIsHabitCompletionUpdate,
    openConfirmModal, setOpenConfirmModal,
    handleOpenModal, handleCloseModal,
  };

  return <UserContext.Provider value={val}>{children}</UserContext.Provider>;
};
