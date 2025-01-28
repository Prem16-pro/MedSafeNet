import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/counterSlice";
import { login } from "./redux/authSlice";

function App() {
  // const count = useSelector((state) => state.counter.value);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log(user);

  function setUser() {
    dispatch(login("AryanBSDk"));
  }

  return (
    <div>
      User : {user}
      <button onClick={setUser}>Sign in</button>
    </div>
  );
}

export default App;
