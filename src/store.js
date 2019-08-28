import { createStore, combineReducers, compose } from 'redux'; 
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer  } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'; 

// Ver documentación en react-redux-firestore

// configurar firebase
// se traen estos datos del sitio de firebase

const firebaseConfig = {
    apiKey: "AIzaSyBpqIfqqfiokPEPAt0BJ2WVQWIi3-c1Wg4",
    authDomain: "bibliotorre-b0a80.firebaseapp.com",
    databaseURL: "https://bibliotorre-b0a80.firebaseio.com",
    projectId: "bibliotorre-b0a80",
    storageBucket: "bibliotorre-b0a80.appspot.com",
    messagingSenderId: "306261184986",
    appId: "1:306261184986:web:522f9736f7dea8ae"
}

firebase.initializeApp(firebaseConfig);

// Configuración de React-Redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

// crear el enhancer con compose 
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

// state inicial

const initialState = {};

// store

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
