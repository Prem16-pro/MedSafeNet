import React from "react";
import { useSelector } from "react-redux";
import { logOut } from "../../firebase/firebasefunctions";
import { DoctorPage } from "./DoctorPage";
import { PatientPage } from "./PatientPage";
import "../../styles/HomePage.css"; // External CSS file for styling

export const HomePage = () => {
  const handleSignOut = () => {
    logOut();
  };

  const user = useSelector((state) => state.auth.user);
  const role = user.role;

  return (
    <div className="home-page">
      <h1>Welcome, {user.username}</h1>

      {/* Conditionally render the DoctorPage or PatientPage */}
      {role === "doctor" ? <DoctorPage /> : <PatientPage />}

      {/* Sign out button */}
      <button className="sign-out-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};
