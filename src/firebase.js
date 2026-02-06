import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut}  from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBknU1Fd1pFjVuquxeDnplTMIFJyF7HDPM",
  authDomain: "netflix-clone-dd26c.firebaseapp.com",
  projectId: "netflix-clone-dd26c",
  storageBucket: "netflix-clone-dd26c.firebasestorage.app",
  messagingSenderId: "26256203491",
  appId: "1:26256203491:web:4dd6e137bfd65031e3efd6",
  measurementId: "G-RHSBG9N6RF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

 const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password );
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
try {
    await signInWithEmailAndPassword(auth, email, password)
} catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}