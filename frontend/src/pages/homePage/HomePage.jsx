import { useSelector } from "react-redux";
import { logOut } from "../../firebase/firebasefunctions";
import { DoctorPage } from "./DoctorPage";
import { PatientPage } from "./PatientPage";

export const HomePage = () => {
  const handleSignOut = () => {
    logOut();
  };
  const user = useSelector((state) => state.auth.user);
  const role = user.role;
  return (
    <>
      {role === "doctor" ? <DoctorPage /> : <PatientPage />}
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};
