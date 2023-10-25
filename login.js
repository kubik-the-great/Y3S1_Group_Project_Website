import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { 
    getAuth,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    onAuthStateChanged
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
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const btnLogin = document.querySelector("#login");
    const btnSignup = document.querySelector("#signup");
    const divLoginMsg = document.querySelector("#divLoginMsg");
    const lblLoginMessage = document.querySelector("#lblLoginMessage");


    const hideLoginError = () => {
        divLoginMsg.style.display = 'none'
        lblLoginMessage.innerHTML = ''
    }
    hideLoginError()
    const showLoginError = (error) => {
        divLoginMsg.style.display = "block"    
        if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
          lblLoginMessage.innerHTML = "Wrong password. Try again."
        }
        else {
          lblLoginMessage.innerHTML = `Error: ${error.message}`   
        }
    }
    const showLoginState = (user) => {
        lblLoginMessage.innerHTML = `You're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email}) `
      }
    
   
    const loginEmailPassword = async () => {
        const loginEmail = email.value;
        const loginPassword = password.value;
        
        try{
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(userCredential.user);
        }
        catch(error){
            console.log(error);
            showLoginError(error);
        }

    }

    btnLogin.addEventListener("click",loginEmailPassword);