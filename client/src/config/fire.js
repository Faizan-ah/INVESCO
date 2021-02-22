import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDdYyf3vScSED6Mfuy-su9QIW-vNZq3QX8",
    authDomain: "historicaldatafyp.firebaseapp.com",
    databaseURL: "https://historicaldatafyp-default-rtdb.firebaseio.com",
    projectId: "historicaldatafyp",
    storageBucket: "historicaldatafyp.appspot.com",
    messagingSenderId: "448707872133",
    appId: "1:448707872133:web:2b902ac5e52e03e443f0ec",
    measurementId: "G-63N92M2VSK"
};

const fire = firebase.initializeApp(config);
export default fire;