import { useEffect, useState } from "react";
import {
  AddPatient,
  decryptData,
  encrypt,
  GetPrescription,
  ListPatients,
  PrescribePatient,
} from "../../firebase/firebasefunctions";
import { useSelector } from "react-redux";
import "../../styles/DoctorPage.css"; // External CSS for styling

export const DoctorPage = () => {
  const [listPatients, setListPatients] = useState(true);
  const [viewPatient, setViewPatient] = useState("");

  if (viewPatient !== "") {
    return <ViewPatient patientId={viewPatient} />;
  }

  return (
    <div className="doctor-page-container">
      <h1>Doctor's Dashboard</h1>
      <div className="button-container">
        <button onClick={() => setListPatients(false)} className="action-btn">
          Add New Patient
        </button>
        <button onClick={() => setListPatients(true)} className="action-btn">
          List Patients
        </button>
      </div>

      {listPatients ? (
        <PatientList setViewPatient={setViewPatient} />
      ) : (
        <AddNewPatient />
      )}
    </div>
  );
};

const PatientList = ({ setViewPatient }) => {
  const user = useSelector((state) => state.auth.user);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await ListPatients(user.uid);
        setList(data);
      } catch (err) {
        setError("Error fetching patients. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, [user.uid]);

  if (loading) {
    return <div>Loading patients...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="patient-list">
      <h2>Patient List</h2>
      {list.length > 0 ? (
        list.map((item, i) => (
          <div key={i} className="patient-item">
            <p>{item.name}</p>
            <button
              onClick={() => setViewPatient(item.id)}
              className="view-btn"
            >
              View
            </button>
          </div>
        ))
      ) : (
        <div>No patients found.</div>
      )}
    </div>
  );
};

const AddNewPatient = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleAddPatient = async () => {
    const data = { name, dob, phone, gender };
    try {
      await AddPatient(user.uid, data);
      alert("Patient added successfully!");
      // Reset fields after successful addition
      setName("");
      setDob("");
      setPhone("");
      setGender("");
    } catch (error) {
      alert("Error adding patient.");
    }
  };

  return (
    <div className="add-patient-form">
      <h2>Add New Patient</h2>
      <input
        placeholder="Enter patient name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="input-field"
      />
      <input
        type="date"
        placeholder="Date of Birth"
        onChange={(e) => setDob(e.target.value)}
        value={dob}
        className="input-field"
      />
      <input
        placeholder="Phone Number"
        type="tel"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className="input-field"
      />
      <input
        placeholder="Gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
        className="input-field"
      />
      <button onClick={handleAddPatient} className="action-btn">
        Add Patient
      </button>
    </div>
  );
};

const ViewPatient = ({ patientId }) => {
  const [prescription, setPrescription] = useState("");
  const [previousPrescriptions, setPreviousPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchPreviousPrescriptions() {
      try {
        const prescriptions = await GetPrescription(user.uid, patientId);
        const temp = prescriptions;

        for (let i = 0; i < temp.length; i++) {
          temp[i] = decryptData(temp[i]);
        }

        setPreviousPrescriptions(temp);
        // setPreviousPrescriptions(prescriptions);
      } catch (err) {
        setError("Error fetching prescriptions.");
      } finally {
        setLoading(false);
      }
    }

    fetchPreviousPrescriptions();
  }, [user.uid, patientId]);

  const handlePrescribe = async () => {
    if (prescription.trim()) {
      try {
        await PrescribePatient(user.uid, patientId, encrypt(prescription));
        setPrescription(""); // Clear the input field after prescribing
        // After prescribing, fetch the updated list of prescriptions
        // const updatedPrescriptions = await GetPrescription(user.uid, patientId);
        const prescriptions = await GetPrescription(user.uid, patientId);
        const temp = prescriptions;

        for (let i = 0; i < temp.length; i++) {
          temp[i] = decryptData(temp[i]);
        }

        setPreviousPrescriptions(temp);
        // setPreviousPrescriptions(updatedPrescriptions);
      } catch (error) {
        setError("Error prescribing. Please try again.");
      }
    }
  };

  return (
    <div className="view-patient-container">
      <h3>Previous Prescriptions:</h3>
      {loading ? (
        <div>Loading prescriptions...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul>
          {previousPrescriptions.length > 0 ? (
            previousPrescriptions.map((prescription, index) => (
              <li key={index}>{prescription}</li>
            ))
          ) : (
            <p>No prescriptions found for this patient.</p>
          )}
        </ul>
      )}

      <input
        placeholder="New Prescription"
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
        className="input-field"
      />
      <button onClick={handlePrescribe} className="action-btn">
        Prescribe
      </button>
    </div>
  );
};
