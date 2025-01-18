import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const provider = new GoogleAuthProvider();

  //Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //create user with email and pass
  const createUserEmailAndPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // log in
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //log out
  const LogOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  //update user
  const userUpdateProfile = (name, photo) => {
    setLoading(false);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //save user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        try {
          const response = await axiosPublic.post("/jwt", userInfo);
          if (response?.data?.token) {
            localStorage.setItem("access-token", response.data.token);
          } else {
            console.error("Token not received");
            localStorage.removeItem("access-token");
          }
        } catch (error) {
          console.error("Error fetching token:", error);
          localStorage.removeItem("access-token");
        }
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);
  // useEffect(()=>{
  //     const unsubscribe = onAuthStateChanged(auth, currentUser=>{
  //         console.log(currentUser);
  //         setUser(currentUser)
  //         if(currentUser){
  //             const userInfo = {email: currentUser.email}
  //             axiosPublic.post('/jwt', userInfo)
  //             .then(res =>{
  //                 if(res.data.token){
  //                     localStorage.setItem('access-token', res.data.token)
  //                 }
  //             })
  //         }
  //         else{
  //             localStorage.removeItem('access-token')
  //         }
  //         setLoading(false)
  //     })
  //     return()=>{
  //         unsubscribe();
  //     }
  // },[])

  const authInfo = {
    user,
    loading,
    createUserEmailAndPass,
    loginUser,
    LogOutUser,
    googleLogin,
    userUpdateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
