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
      <button onClick={handleSignOut}>Sign Out</button>
      {role === "doctor" ? <DoctorPage /> : <PatientPage />}
    </>
  );
};
