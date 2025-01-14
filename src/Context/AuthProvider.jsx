import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const provider = new GoogleAuthProvider();

    //Google login
    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    //create user with email and pass
    const createUserEmailAndPass = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // log in 
    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //log out 
    const LogOutUser =()=>{
        setLoading(true)
        return signOut(auth)
    }




    //save user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log(currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return()=>{
            unsubscribe();
        }
    },[])



    const authInfo ={
        user,
        loading,
        createUserEmailAndPass,
        loginUser,
        LogOutUser,
        googleLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;