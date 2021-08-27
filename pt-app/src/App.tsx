import React from "react";
import "./App.css";

import MapView from "./components/Map/MapView";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <MapView/>
     </div>
  )
}

export default App;
