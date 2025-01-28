import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { app } from "./firebase/firebase";
import { AuthPages } from "./pages/authPages/authPages";
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HomePage } from "./pages/homePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/authSlice";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const auth = getAuth();
  console.log(user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser)
        // User is signed in.
        dispatch(login(currentUser));
      } else {
        // No user is signed in.
        dispatch(login(null));
      }
    });

    // Cleanup the listener on component unmount.
    return () => unsubscribe();
  }, [auth]);
  console.log(app);
  return (
    <>
      {user ? <HomePage /> : <AuthPages />}
      {/* <AuthPages/> */}
    </>
  );
}

export default App;
