// src/App.js

import { useState, useEffect } from "react";
import { app } from "./firebase/firebase";
import { AuthPages } from "./pages/authPages/authPages";
import { HomePage } from "./pages/homePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { decryptData, fetchUserData } from "./firebase/firebasefunctions";
import AESExample from "./encrypt/AESExample";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const auth = getAuth();
  console.log(user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Store only serializable data (uid, email)

        const temp = async()=>{
          const data = await fetchUserData(currentUser.uid);
          console.log(data);

          dispatch(
            login({
              uid: currentUser.uid,
              email: decryptData(data.email),
              username: decryptData(data.username),
              role: data.role
            })
          );
        }
        temp();


      } else {
        dispatch(login(null));
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return <>{user ? <HomePage /> : <AuthPages />}</>;
}

export default App;
