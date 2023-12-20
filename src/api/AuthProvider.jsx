import  { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import app from '../Firebase/firebase.config';

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const [user, setUser] = useState();
    const [loading,setLoading] = useState(true)

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
    const authInfo ={
        user,
        loading,
        signUp,
        signIn,
        getProfile,
        logOut
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