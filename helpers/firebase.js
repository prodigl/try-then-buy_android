import firebase from 'firebase';



const firebaseConfig = {

    apiKey: "AIzaSyA0vD92FV9NtGFoPOHO-PoccpJr5QyH7NI",
    authDomain: "try-then-buy-1bf32.firebaseapp.com",
    projectId: "try-then-buy-1bf32",
    storageBucket: "try-then-buy-1bf32.appspot.com",
    messagingSenderId: "106359524355",
    appId: "1:106359524355:web:d01b57ab4ea6c345a31236",
    measurementId: "G-RHKHW2MWE9"
};

//initialize firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

export default firebase;
