import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyACzDddHqMVuCw1WkHnH0zIUUbyVgUEpNg",
    authDomain: "test-64a36.firebaseapp.com",
    projectId: "test-64a36",
    storageBucket: "test-64a36.appspot.com",
    messagingSenderId: "1001107722986",
    appId: "1:1001107722986:web:9ca839fdbfe68cc32a7d93"
};

const fire = firebase.initializeApp(config);
export default fire;