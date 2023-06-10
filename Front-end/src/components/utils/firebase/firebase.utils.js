
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged } from "firebase/auth"
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore"




const firebaseConfig = {
  apiKey: "AIzaSyASW-1Y5Eb03B25VxWhSGfJK4IJWfL9xK0",
  authDomain: "quiz-web-app-d73a1.firebaseapp.com",
  projectId: "quiz-web-app-d73a1",
  storageBucket: "quiz-web-app-d73a1.appspot.com",
  messagingSenderId: "876699038817",
  appId: "1:876699038817:web:9d6fe1ce3b23ae2934a620",
  measurementId: "G-6F2S0136WT"
};


initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (user, additionalInfo = {}) => {

  const userDocRef = doc(db, "users", user.uid)
  const userSnapshot = await getDoc(userDocRef)
  if (!userSnapshot.exists()) {
    const { displayName, email } = user
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo })
    }
    catch (e) {
      console.log("There was an error : ", e)
    }
  }
}

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    console.log("not found")
    return
  }
  return await signInWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}

// export const addCollectionAndDocuments = async (collectionKey, object) => {
//   const collectionDocRef = collection(db, collectionKey)
//   const batch = writeBatch(db)
//   const docRef = doc(collectionDocRef, object.accType.toLowerCase())
//   batch.set(docRef, object)
//   await batch.commit()
//   console.log("done")
// }
export const signOutUser = async () => {
  await signOut(auth)
  window.location.href="http://localhost:3000"
}
export const getCurrentUser=()=>{
  return auth.currentUser
}


// if (currentUser) {
//   const userId = currentUser.uid;
//   const name = currentUser.displayName;
//   const email = currentUser.email;
//   const photoURL = currentUser.photoURL;
// }
