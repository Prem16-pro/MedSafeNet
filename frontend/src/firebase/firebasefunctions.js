import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  query,
  getDocs,
  where,
} from "firebase/firestore";

import bcrypt from 'bcryptjs'
import CryptoJS from "crypto-js";
const db = getFirestore();
const auth = getAuth();

export const createUser = (email, password, username, role) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("User created successfully");
      console.log(user);
      console.log(user.uid);
      initializeUser(email, password, username, role, user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
};

export const logInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Log out successfull");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

// const intializeUser = async (email, password, username, role, uid) => {
//   try {
//     const docRef = await setDoc(doc(db, "users", uid), {
//       email: email,
//       password: password,
//       username: username,
//       role: role,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

     // Import bcrypt for password hashing

const secretKey = 'your-secret-key'; 

export const initializeUser = async (email, password, username, role, uid) => {
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Encrypt sensitive data using AES encryption
    const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
    const encryptedUsername = CryptoJS.AES.encrypt(username, secretKey).toString();

    // Store the encrypted and hashed data in Firestore
    const docRef = await setDoc(doc(db, "users", uid), {
      email: encryptedEmail,            // Store the encrypted email
      password: hashedPassword,         // Store the hashed password
      username: encryptedUsername,      // Store the encrypted username
      role: role,                       // Store the role (no need for encryption here if it's not sensitive)
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);  // Convert to UTF-8 string
  return originalData;
};

export const fetchUserData = async (uid) => {
  try {
    const docRef = doc(db, "users", uid );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, we return the data
      // console.log("User data:", docSnap.data());
      return docSnap.data();
    } else {
      // No such document!
      console.log("No user data found!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching user data: ", e);
    return null;
  }
};

export const AddPatient = async (doctorId, patiendDetails) => {
  try {
    const patientDocRef = await addDoc(collection(db, "patients"), {
      name: patiendDetails.name,
      dob: patiendDetails.dob,
      phone: patiendDetails.phone,
      gender: patiendDetails.gender,
      doctorId: doctorId,
      id: "",
    });

    await setDoc(
      patientDocRef,
      {
        id: patientDocRef.id,
      },
      { merge: true }
    );

    console.log("New Patient Added", patientDocRef.id);
    // console.log("New Patient Added", doctorDocRef.id);
  } catch (e) {
    console.error("error adding new patient");
  }
};

export const ListPatients = async (doctorId) => {
  try {
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("doctorId", "==", doctorId));
    const querySnapshot = await getDocs(q);
    const patients = [];
    querySnapshot.forEach((doc) => {
      patients.push(doc.data());
    });
    return patients;
  } catch (e) {
    console.error("error listing patients", e);
  }
};

export const PrescribePatient = async (
  doctorId,
  patientId,
  newPrescription
) => {
  try {
    const doctorRef = doc(db, "doctors", doctorId);

    // Reference to the patient’s record
    const patientRecordRef = doc(doctorRef, "patientRecords", patientId);

    // Get the existing patient record
    const patientDoc = await getDoc(patientRecordRef);

    if (patientDoc.exists()) {
      // If the patient already has prescriptions, add the new one to the array
      const existingPrescriptions = patientDoc.data().prescriptions || [];
      existingPrescriptions.push(newPrescription);

      // Update the patient record with the new prescription array
      await setDoc(
        patientRecordRef,
        {
          prescriptions: existingPrescriptions,
        },
        { merge: true }
      ); // Merge ensures that other fields are not overwritten
    } else {
      // If the patient doesn't have a record yet, create a new one with the first prescription
      await setDoc(patientRecordRef, {
        prescriptions: [newPrescription],
      });
    }

    console.log("Patient Prescribed", newPrescription);
  } catch (e) {
    console.error("Error prescribing patient", e);
  }
};

export const GetPrescription = async (doctorId, patientId) => {
  try {
    const patientRecordRef = doc(
      db,
      "doctors",
      doctorId,
      "patientRecords",
      patientId
    );

    const docSnapshot = await getDoc(patientRecordRef);

    if (docSnapshot.exists()) {
      const prescriptions = docSnapshot.data().prescriptions || [];
      console.log("All Prescriptions Retrieved:", prescriptions);
      return prescriptions; // Return the array of prescriptions
    } else {
      console.log("No prescriptions found for this patient.");
      return [];
    }
  } catch (e) {
    console.error("Error retrieving prescriptions:", e);
    return [];
  }
};
