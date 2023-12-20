import  { createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth"
import app from '../Firebase/firebase.config';

export const AuthContext = createContext()
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading,setLoading] = useState(true)
    const [authError,setAuthError] = useState("")

    const signUp = (email,password) => {
        return createUserWithEmailAndPassword (auth, email,password)
    }
    const signIn = (email,password) => {
        setLoading(false)
        return signInWithEmailAndPassword (auth,email,password)
    }
    const getProfile = (displayName) => {
        return updateProfile(auth.currentUser, {displayName})
    }
    const logOut = () => {
        return signOut(auth)
    }
    const googleLogin = () => {
        return signInWithPopup(auth,googleAuthProvider)
    }
    const authInfo ={
        user,
        loading,
        signUp,
        signIn,
        getProfile,
        googleLogin,
        logOut,
        authError,
        setAuthError
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=> unsubscribe()
    },[])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;