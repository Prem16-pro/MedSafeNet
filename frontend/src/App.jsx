import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { app } from './firebase/firebase'
import { AuthPages } from './pages/authPages/authPages'

function App() {
  console.log(app)
  return(<>
    <AuthPages/>
  </>)
}

export default App
