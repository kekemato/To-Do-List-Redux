import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCzAG1y3lOrL5_qgdUIgiKyaFl9RFbs7hQ",
    authDomain: "todo-list-0812.firebaseapp.com",
    databaseURL: "https://todo-list-0812.firebaseio.com",
    projectId: "todo-list-0812",
    storageBucket: "todo-list-0812.appspot.com",
    messagingSenderId: "321528043078"
  }

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()