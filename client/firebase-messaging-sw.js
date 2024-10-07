importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCLurJYejrMmapRTzXSJLI5QPurcoUNQNE",
  authDomain: "digitomise-b4970.firebaseapp.com",
  projectId: "digitomise-b4970",
  storageBucket: "digitomise-b4970.appspot.com",
  messagingSenderId: "977877319434",
  appId: "1:977877319434:web:3e91a47a3a7359c1ac04f3",
  measurementId: "G-06H0VVZQK7"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ",payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
