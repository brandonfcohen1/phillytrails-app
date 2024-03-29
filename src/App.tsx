import "./App.css";
import Map from "./components/Map/Map";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Map />
          </div>
        </Route>
        <Route path="/route/:id" children={<DirectRoute />} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

function DirectRoute() {
  let id: number = useParams();

  return (
    <div className="App">
      <div className="App">
        <Map id={id} />
      </div>
    </div>
  );
}
