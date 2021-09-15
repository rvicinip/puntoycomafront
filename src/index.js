import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import "../src/assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "../src/assets/css/demo.css";
import { AppContextProvider } from "./contexts/AppContext.js";
import Layout from './components/Menu/Layout.js'
//'components/Menu/Layout.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBalZjXZoqo129L3LpM0xOCKHXRzBd65ro",
    authDomain: "puntoycoma-6cfe5.firebaseapp.com",
    projectId: "puntoycoma-6cfe5",
    storageBucket: "puntoycoma-6cfe5.appspot.com",
    messagingSenderId: "215104963964",
    appId: "1:215104963964:web:47b88f5f4b3e6aeb6990f9",
    measurementId: "G-9WKMJG40R9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const relative_path = "/src"






const Rutas = () => {

  return (
    <AppContextProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppContextProvider>
  );
};
 
ReactDOM.render(<Rutas />, document.getElementById("root"));
