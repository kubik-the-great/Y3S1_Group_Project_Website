import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { 
    getAuth,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
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
    const db = getFirestore();
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const btnLogin = document.querySelector("#login");
    const btnSignup = document.querySelector("#signup");
    const loginForm = document.querySelector("#form")
    const divLoginMsg = document.querySelector("#divLoginMsg");
    const lblLoginMessage = document.querySelector("#lblLoginMessage");
    const gprovider = new GoogleAuthProvider();

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
          lblLoginMessage.innerHTML = `Error: invalid E-mail or pasword`   
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
            showLoginState(auth);
            console.log(userCredential.user);
            loginForm.reset();
            window.location.href = "index.html"
        }
        catch(error){
            console.log(error);
            showLoginError(error);
        }

    }

    btnLogin.addEventListener("click",loginEmailPassword);
    auth.onAuthStateChanged(user => {
        console.log(user);
    })

    // Google login
    const googleimg = document.querySelector("#google");
    googleimg.addEventListener("click", function() {
        signInWithPopup(auth, gprovider)
        .then((result) => {
            const user = result.user; // Signed in user info
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            alert("Welcome "+user.displayName);
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });		  		  
    });