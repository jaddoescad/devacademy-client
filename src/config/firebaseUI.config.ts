// /config/firebaseAuthUI.config.js
export const uiConfig = (firApp) => {
    return {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        tosUrl: '/terms-of-service',
        privacyPolicyUrl: '/privacy-policy',
        signInOptions: [
            firApp && firApp.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID 
        ]
    }
}