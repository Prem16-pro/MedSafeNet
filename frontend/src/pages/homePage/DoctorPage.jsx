import { useEffect, useState } from "react";
import {
  AddPatient,
  GetPrescription,
  ListPatients,
  PrescribePatient,
} from "../../firebase/firebasefunctions";
import { useSelector } from "react-redux";

export const DoctorPage = () => {
  const [listPatients, setListPatients] = useState(true);
  const [viewPatient, setViewPatient] = useState("");

  if (viewPatient !== "") {
    return <ViewPatient patientId={viewPatient} />;
  }

  return (
    <>
      <h1>Doctor Page</h1>
      <form>
        <input placeholder="Enter patient name" name="patient-name" />
        <input type="date" placeholder="Date of Birth" name="dob" />
        <select name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input placeholder="Phone Number" name="phone" type="tel" />
        <textarea placeholder="Medical History" name="medical-history" />
        <textarea placeholder="Allergies" name="allergies" />
        <textarea placeholder="Current Medications" name="medications" />
        <textarea placeholder="Symptoms" name="symptoms" />
        <button type="submit">Add Patient</button>
      </form>
    </>
  );
};

const PatientList = ({ setViewPatient }) => {
  const user = useSelector((state) => state.auth.user);
  const [list, setList] = useState([]);

  async function Temp() {
    const data = await ListPatients(user.uid);
    setList(data);
  }

  Temp();

  if (list) {
    return (
      <div>
        <h1>Patient List</h1>
        <div>
          {list.map((item, i) => {
            return (
              <div key={i}>
                <p>{item.name}</p>
                <button onClick={() => setViewPatient(item.id)}>View</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>No Patient Found</div>;
  }
};

const AddNewPatient = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const user = useSelector((state) => state.auth.user);

  const handleAddPatient = () => {
    const data = {
      name,
      dob,
      phone,
      gender,
    };

    AddPatient(user.uid, data);
  };
  return (
    <div>
      <input
        placeholder="Enter patient name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        onChange={(e) => setDob(e.target.value)}
      />
      <input
        placeholder="Phone Number"
        type="tel"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
      <button onClick={handleAddPatient}>Add Patient</button>
    </div>
  );
};

const ViewPatient = ({ patientId }) => {
  const [prescription, setPrescription] = useState("");
  const [previousPrescriptions, setPreviousPrescriptions] = useState([]);
  const user = useSelector((state) => state.auth.user);

  // Fetch previous prescriptions on component mount or whenever patientId changes
  useEffect(() => {
    async function fetchPreviousPrescriptions() {
      const prescriptions = await GetPrescription(user.uid, patientId);
      setPreviousPrescriptions(prescriptions);
    }
    fetchPreviousPrescriptions();
  }, [user.uid, patientId]);

  const handlePrescribe = async () => {
    if (prescription.trim()) {
      await PrescribePatient(user.uid, patientId, prescription);
      setPrescription(""); // Clear the input field after prescribing
      // After prescribing, fetch the updated list of prescriptions
      const updatedPrescriptions = await GetPrescription(user.uid, patientId);
      setPreviousPrescriptions(updatedPrescriptions);
    }
  };

  return (
    <div>
      <h3>Previous Prescriptions:</h3>
      <ul>
        {previousPrescriptions.length > 0 ? (
          previousPrescriptions.map((prescription, index) => (
            <li key={index}>{prescription}</li>
          ))
        ) : (
          <p>No prescriptions found for this patient.</p>
        )}
      </ul>

      <input
        placeholder="New Prescription"
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
      />
      <button onClick={handlePrescribe}>Prescribe</button>
    </div>
  );
};
