import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import MapView from "./components/Map/MapView";
import Search from "./components/Search/Search";
import Preview from "./components/Preview/Preview";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Header />
      <MapView/>
    </div>
  );
}
export default App;
