import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import "../src/assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "../src/assets/css/demo.css";
import { AppContextProvider } from "contexts/AppContext.js";
import Layout from 'components/Menu/Layout.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);






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
