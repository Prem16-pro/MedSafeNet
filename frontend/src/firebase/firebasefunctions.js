import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
const auth = getAuth();

export const createUser = (email,password)=>{
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("User created successfully")
    console.log(user)
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // ..
  });
}
export const logInUser = (email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
}
export const logOut = ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Log out successfull")
      }).catch((error) => {
        // An error happened.
        console.log(error)

      });
}