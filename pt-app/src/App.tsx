import React from "react";
import "./App.css";

import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
//import RouteBuilder from "./components/RouteBuilder/RouteBuilder";

function App() {
  return (
    <div className="App">
      <Header/>
      <Map/>
      {/* <RouteBuilder/> */}
     </div>
  )
}

export default App;
