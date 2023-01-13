importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
        .then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function(err) {
            console.log('Service worker registration failed, error:', err);
        });
}

firebase.initializeApp({
    apiKey: "AIzaSyA0vD92FV9NtGFoPOHO-PoccpJr5QyH7NI",
    authDomain: "try-then-buy-1bf32.firebaseapp.com",
    projectId: "try-then-buy-1bf32",
    storageBucket: "try-then-buy-1bf32.appspot.com",
    messagingSenderId: "106359524355",
    appId: "1:106359524355:web:d01b57ab4ea6c345a31236",
    measurementId: "G-RHKHW2MWE9"
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/brand-logo.svg' 
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});