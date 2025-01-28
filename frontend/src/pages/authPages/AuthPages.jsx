import { useState } from "react";
import { createUser, logInUser } from "../../firebase/firebasefunctions";

export const AuthPages = () => {
  const [loginPage, setLoginPage] = useState(false);
  return (
    <>
      {loginPage ? (
        <LoginPage setLoginPage={setLoginPage} />
      ) : (
        <SignUpPage setLoginPage={setLoginPage} />
      )}
    </>
  );
};

const LoginPage = ({ setLoginPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogIn = () => {
    console.log(email);
    console.log(password);
    logInUser(email, password);
  };
  return (
    <>
      <div className="container">
        <div>Login Page</div>
        <input
          placeholder="Enter email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="Enter password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button onClick={handleLogIn}>Log In</button>
        <div>Don't have an account? </div>
        <button
          onClick={() => {
            setLoginPage(false);
          }}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

const SignUpPage = ({ setLoginPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [username, setUserName] = useState("");
  const handleSignUp = () => {
    console.log(email);
    console.log(password);
    createUser(email, password, username, role);
  };
  return (
    <>
      <div className="container">
        <div>Sign Up</div>
        <input
          placeholder="Enter username"
          name="username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <input
          placeholder="Enter email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          placeholder="Enter password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button onClick={handleSignUp}>Sign Up</button>
        <div>Already have an account? </div>
        <button
          onClick={() => {
            setLoginPage(true);
          }}
        >
          Log In
        </button>
      </div>
    </>
  );
};
