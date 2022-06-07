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

document.querySelector('.googleAuthBtn').onclick  = function() {
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

document.querySelector('.gitAuthBtn').onclick = function() {
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