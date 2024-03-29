import { STEPS, FOOTER_STEPS } from "./formSteps";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import StrugglesPage from "../pages/StrugglesPage/StrugglesPage";
import ImprovementsPage from "../pages/ImprovementsPage/ImprovementsPage";
import HabitTrackerPage from "../pages/HabitTrackerPage/HabitTrackerPage";

import SaveProgressPage from "../pages/SaveProgressPage/SaveProgressPage";
import SignUpForm from "../components/SignupForm/SignupForm";
import LoginForm from "../components/LoginForm/LoginForm";
import AccountSettings from "../components/AccountSettings/AccountSettings";
import Homepage from "../pages/routes/Homepage/Homepage";

import { Typography } from "@mui/material";
  import { faBookBible, faHandsPraying, faChurch, faHandBackFist, faPersonRunning, faMusic, faFilm, faMoneyBill, faBook, faBroom, faAppleWhole, faPersonShelter, faPeoplePulling, faBullseye, faFaceSmile, faClipboardList, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, getDoc, query, where, doc } from "firebase/firestore";
import { db, auth } from "./firebaseSetup";
import HabitEditor from "../pages/HabitEditor/HabitEditor";
import IdeasPage from "../pages/routes/IdeasPage/IdeasPage";
import ProfilePage from "../pages/routes/ProfilePage/ProfilePage";
import TermsAndConditions from "../components/TermsAndConditions/TermsAndConditions";


export const findUser = async () => {
    // const userCollectionRef = collection(db, "users")
    // const userQuery = query(userCollectionRef, where("uid", "==", auth.currentUser.uid))
    // const docRefs = await getDocs(userQuery)
    const docRef = doc(db, `users/${auth?.currentUser?.uid}`)
    const docSnap = await getDoc(docRef)

    let res

    if (docSnap.exists()) {
        res = {documentId: docSnap.id, ...docSnap.data()}
    } else {
        console.error("document doesn't exist")
    }

    // docRefs.forEach(doc => {
    //     // res.push({
    //     //     documentId: doc.id, 
    //     //     ...doc.data()
    //     // })
    //     res = {
    //         documentId: doc.id, 
    //         ...doc.data()
    //     }
    // })
    return res

}



export const getCurrentFormStep = (step) => {
  switch (step) {
    case STEPS.WELCOME:
      return <WelcomePage />;
    case STEPS.STRUGGLES:
      return <StrugglesPage /> ;
      case STEPS.IMPROVEMENTS:
      return <ImprovementsPage /> ;
      case STEPS.HABIT_TRACKER: 
      return <HabitTrackerPage /> ;
      case STEPS.SAVE_PROGRESS:
        return <SaveProgressPage />
    case STEPS.SIGN_UP:
      return <SignUpForm />;
    case STEPS.LOG_IN:
      return <LoginForm />;
    default:
      return <Typography variant="h1">Invalid Step. Please refresh the page</Typography>;
  }
};

export const getFooterStep = (step) => {
  switch (step) {
    case FOOTER_STEPS.HOME:
      return <Homepage />;
    case FOOTER_STEPS.HABITS:
      return <HabitEditor /> ;
      case FOOTER_STEPS.IDEAS:
      return <IdeasPage /> ;
      case FOOTER_STEPS.PROFILE: 
      return <ProfilePage /> ;
      case FOOTER_STEPS.ACCOUNT_SETTINGS: 
      return <AccountSettings /> ;
      case FOOTER_STEPS.TERMS_OF_USE: 
      return <TermsAndConditions /> ;
    default:
      return <Typography variant="h1">Invalid Step. Please refresh the page</Typography>;
  }
};

 export const habits = [
  { id: 1, name: 'Read the Bible', 
  description: "Reading the Bible daily can deepen your relationship with God, increase knowledge and understanding of His word, and provide guidance and comfort in daily life.",
  icon: faBookBible,
  completed: false, },
  { id: 2, name: 'Pray for at least 1 minute', 
  description: "Prayer is a powerful way to connect with God, seek His guidance, and express gratitude. Praying daily for at least 1 minute can help build a habit of consistent communication with God.",
  icon: faHandsPraying,
  completed: false, },
  { id: 3, name: 'Attend church', 
  description: "Attending church services can provide a sense of community and fellowship with other believers, provide opportunities for worship and learning, and encourage accountability and growth in one's faith.",
  icon: faChurch,
  completed: false, },
  { id: 4, name: 'Fast', 
  description: "Fasting can help you develop self-discipline and self-control, and can also be a spiritual discipline that helps you draw closer to God and seek His guidance.",
  icon: faHandBackFist,
  completed: false, },
  { id: 5, name: 'Exercise', 
  description: "Taking care of your physical health is important for overall well-being, and can also help you better serve God and others by having more energy and endurance.",
  icon: faPersonRunning,
  completed: false, },
  { id: 6, name: 'Worship', 
  description: "Worship is an important aspect of a Christian's spiritual life, as it helps one connect with God, express gratitude, and deepen one's faith.",
  icon: faMusic,
  completed: false, },
  { id: 7, name: 'Consuming Christian Content', 
  description: "Reading Christian books, listening to Christian podcasts, or watching Christian videos can provide additional insights and inspiration to help one grow in their faith.",
  icon: faFilm,
  completed: false, },
  { id: 8, name: 'Tithe', 
  description: "Tithing, or giving a portion of your income to the church or to charitable causes, is an act of obedience to God and can also help one develop a spirit of generosity and gratitude.",
  icon: faMoneyBill,
  completed: false, },
  { id: 9, name: 'Journal my thoughts', 
  description: "Journaling can be a helpful way to reflect on your experiences, thoughts, and emotions, and can also be a tool for spiritual growth by providing a way to document insights and lessons learned.",
  icon: faBook,
  completed: false, },
  { id: 10, name: 'Clean & organize my environment', 
  description: "A clean and organized environment can help reduce stress and increase productivity, which can in turn free up more time and energy for serving God and others.",
  icon: faBroom,
  completed: false, },
  { id: 11, name: 'Eat nutritious foods', 
  description: "Taking care of your physical health through proper nutrition can help you have more energy and focus to serve God and others.",
  icon: faAppleWhole,
  completed: false, },
  { id: 12, name: 'Do an act of kindness', 
  description: "Doing acts of kindness can help you develop a servant heart and reflect God's love to others.",
  icon: faHeartCirclePlus,
  completed: false, },
{ id: 13, name: "Write down 3 things I'm grateful", 
description: "Practicing gratitude can help you develop a more positive attitude and cultivate a sense of joy and contentment.",
icon: faClipboardList,
completed: false, },
  { id: 14, name: 'Be kind to others & myself', 
  description: "Being kind to others and yourself can help create a more positive and encouraging environment, and can also reflect God's love and kindness to others.",
  icon: faFaceSmile,
  completed: false, },
  { id: 15, name: 'Reflect on my goals', 
  description: "Reflecting on your goals can help provide direction and focus in life, and can also help you discern God's will and purpose for their life.",
  icon: faBullseye,
  completed: false, },
  { id: 16, name: 'Volunteer', 
  description: "Volunteering can provide opportunities to serve others, demonstrate God's love to others, and develop a servant heart.",
  icon: faPersonShelter,
  completed: false, },
  { id: 17, name: 'Speak to a spiritual mentor', 
  description: "Speaking with a spiritual mentor can provide guidance and support in your spiritual journey, and can also provide accountability and encouragement",
  icon: faPeoplePulling,
  completed: false, },
];
