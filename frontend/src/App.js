import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";import "./index.css"
import WebFont from "webfontloader"
import Home from "./components/layout/Home/Home.js"


function App() {

  React.useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (

    <BrowserRouter>
    
    <Routes>
      {/* <Routes> */}
      {/* <Header/> */}
      <Route exact path="/" Component={Home}/>
      {/* <Footer/>       */}
      {/* </Routes>   */}
    </Routes>
    </BrowserRouter>

    
  );
}

export default App;
