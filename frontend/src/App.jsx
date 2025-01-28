
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { app } from './firebase/firebase'
import { AuthPages } from './pages/authPages/authPages'
import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HomePage } from './pages/homePage/HomePage'

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in.
        setUser(currentUser);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Cleanup the listener on component unmount.
    return () => unsubscribe();
  }, [auth]);
  console.log(app)
  return(<>
    {user ? <HomePage/>: <AuthPages/> }
    {/* <AuthPages/> */}
  </>)
}

export default App;
