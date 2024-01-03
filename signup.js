import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { 
    getFirestore, collection, onSnapshot,
    addDoc, doc,
    query, where,
    getDoc
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyDJfxh-j3TFZ1YDlOIStrePws_a1g6GXz8",
    authDomain: "groupprojecty3s1.firebaseapp.com",
    databaseURL: "https://groupprojecty3s1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "groupprojecty3s1",
    storageBucket: "groupprojecty3s1.appspot.com",
    messagingSenderId: "855393373568",
    appId: "1:855393373568:web:dcec41edd827f222bc4565",
    measurementId: "G-J3PH4XQ8T7"
};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();
    const db = getFirestore();
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const btnSignup = document.querySelector("#signup");
    const signupForm = document.querySelector("#form")
    const col = collection(db,'GPUser');
    

    //sign up with email and password
    const createAccount = async () => {
        const loginEmail = email.value;
        const loginPassword = password.value;

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(userCredential.user);

            // add document to firebase
            addDoc(col, {
                firstname: fname.value,
                lastname: lname.value,
                email: email.value,
                
            })
            .then(() => {
                signupForm.reset();
            })
            
        
        }
        catch(error){
            console.log(error);
        }
        
    }

    btnSignup.addEventListener("click", createAccount);

    //get data in real time
    onSnapshot(col, (snapshot) => {
        let GPUsers = [];
        snapshot.docs.forEach((doc) => {
            GPUsers.push({...doc.data(),id: doc.id})
        })
        console.log(GPUsers);
    })
    
    auth.onAuthStateChanged(user => {
        console.log(user);
    })
    const docRef = doc(db, 'GPUser', )