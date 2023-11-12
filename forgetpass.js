import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { 
    getAuth,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js'

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
    const forgetEmail = document.querySelector("#email");
    const submit = document.querySelector("#submit");

    submit.addEventListener("click", () => {
        sendPasswordResetEmail(auth, forgetEmail.value)
        .then(() => {
            forgetEmail = "";
            alert("Congratulation! ", "Your Password has been reset!", "Please check your email");

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Sorry!", "Please enter correct email or your password has already been reset!");
        })
    })
