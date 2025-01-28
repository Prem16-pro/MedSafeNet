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
} from "firebase/firestore";

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
      intializeUser(email, password, username, role, user.uid);
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

const intializeUser = async (email, password, username, role, uid) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      email: email,
      password: password,
      username: username,
      role: role,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchUserData = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
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
