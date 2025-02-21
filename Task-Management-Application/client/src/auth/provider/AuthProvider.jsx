import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import AuthContext from "../context/AuthContext";
import useAxiosPublic from "../hook/useAxiosPublic";

const AuthProvider = ({ children }) => {

  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  };

  const logOut =() => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      });
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
    }
  };

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  // { loading && <div className="flex items-center justify-center my-52"> <Spinner /> </div> }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('current user', currentUser);

      if(currentUser){
        const user = { email: currentUser.email }
        // console.log(import.meta.env.VITE_API_BASE_URL)
        axiosPublic.post('/jwt', user)
        .then(res => {
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        })
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    })
    return () => {
      return unsubscribe();
    }
  }, []);

  const authInfo = {
    user,
    // setUser,
    loading,
    // setLoading,
    createUser,
    logIn,
    logOut,
    updateUserProfile,
    signInWithGoogle,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;