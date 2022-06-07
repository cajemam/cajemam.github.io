import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDDiePq0IFWXflzwoSKpIEGCXCNCc1-DiE",
    authDomain: "cajemam-carente.firebaseapp.com",
    projectId: "cajemam-carente",
    storageBucket: "cajemam-carente.appspot.com",
    messagingSenderId: "652369637774",
    appId: "1:652369637774:web:995371886087d07a87b4df",
    measurementId: "G-2HHSBJPGGT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

const signInWithGoogle = function() {
    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode + '- ' + errorMessage, + ' - '+ email + " - " + credential);
    });
}

const signInWithGithub = function() {
    let provider = new GithubAuthProvider();
    provider.addScope('repo');
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorCode + '- ' + errorMessage, + ' - '+ email + " - " + credential);
    });
}