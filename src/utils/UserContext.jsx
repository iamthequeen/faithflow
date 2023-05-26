import { createContext, useState, useEffect, useContext } from "react";
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseSetup";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faBookBible, faHandsPraying, faChurch } from "@fortawesome/free-solid-svg-icons";


export const UserContext = createContext();

export const useAuth = () => useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  //   User Info
  const [userFirstName, setUserFirstName] = useState("Guest");

const [currentUser, setCurrentUser] = useState(null);

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user ? user : null)
    })
    return () => {
      unsubscribe()
    }
  })

const [ myHabits, setMyHabits ] = useState([
  // { id: 1, name: 'Read the Bible', 
  // description: "Reading the Bible daily can deepen your relationship with God, increase knowledge and understanding of His word, and provide guidance and comfort in daily life.",
  // icon: <FontAwesomeIcon icon={faBookBible} />,
  // completed: false, },
  // { id: 2, name: 'Pray for at least 1 minute.', 
  // description: "Prayer is a powerful way to connect with God, seek His guidance, and express gratitude. Praying daily for at least 1 minute can help build a habit of consistent communication with God.",
  // icon: <FontAwesomeIcon icon={faHandsPraying} />,
  // completed: false, },
  // { id: 3, name: 'Attend church', 
  // description: "Attending church services can provide a sense of community and fellowship with other believers, provide opportunities for worship and learning, and encourage accountability and growth in one's faith.",
  // icon: <FontAwesomeIcon icon={faChurch} />,
  // completed: false, },
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

  useEffect(() => {
    const observeCurrentUser = onAuthStateChanged(auth, user => {
setCurrentUser(user)
    })
    return () => {
        observeCurrentUser()
    }
  }, [])


  // const logout = () => {
  //   return signOut(auth)
  // }

  const [hasDoneNewUserFormBefore, setHasDoneNewUserFormBefore] = useState(false)



  // Values
  const val = {
    userFirstName, setUserFirstName,
    currentUser, 
    createAccount,
    login,
    myHabits, setMyHabits,
    hasDoneNewUserFormBefore, setHasDoneNewUserFormBefore
  };

  return <UserContext.Provider value={val}>{children}</UserContext.Provider>;
};