import React from 'react';
import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import 'firebase/analytics';
import 'firebase/performance';

export const firebaseConfig = {
    apiKey: "AIzaSyC_Hcg2AQr2it1xhmFtGJDTrfIaDMRUvdc",
    authDomain: "dashboard-modelo.firebaseapp.com",
    projectId: "dashboard-modelo",
    storageBucket: "dashboard-modelo.appspot.com",
    messagingSenderId: "410502314042",
    appId: "1:410502314042:web:8845db523c826360771d03",
    measurementId: "G-1H5T99NJ98"
  };

//console.log('process.env/publicRuntimeConfig -->>',publicRuntimeConfig)


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

let analytics_temp;

if (typeof window !=="undefined" && firebase.apps.length) {
    analytics_temp = firebase.analytics();
}


export const SERVER_TIMESTAMP   = firebase.firestore.FieldValue.serverTimestamp();
export const storageKey         = 'freelancer-71ceb-local-storage-8787856454';
export const analytics          = analytics_temp;
export const performance        = firebase.performance;
export const firebaseComp       = firebase;
export const firestore          = firebase.firestore();
export const firebaseAuth       = firebase.auth();
export const storage            = firebase.storage();
export const firebaseFunctions  = firebase.functions();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const PhoneAuthProvider    = new firebase.auth.PhoneAuthProvider();
export const GithubAuthProvider   = new firebase.auth.GithubAuthProvider();
export const EmailAuthProvider    = new firebase.auth.EmailAuthProvider();
