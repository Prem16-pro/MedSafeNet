import { useState } from "react";
import { createUser, logInUser } from "../../firebase/firebasefunctions";
import '../../styles/AuthPages.css'; // External CSS file for styling

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
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleLogIn} className="auth-button">
        Log In
      </button>
      <div className="auth-toggle">
        Don't have an account?{" "}
        <button onClick={() => setLoginPage(false)} className="auth-link">
          Sign Up
        </button>
      </div>
    </div>
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
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter username"
        name="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        className="auth-input username"
      />
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleSignUp} className="auth-button">
        Sign Up
      </button>
      <div className="auth-toggle">
        Already have an account?{" "}
        <button onClick={() => setLoginPage(true)} className="auth-link">
          Log In
        </button>
      </div>
    </div>
  );
};
