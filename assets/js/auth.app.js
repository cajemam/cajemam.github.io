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