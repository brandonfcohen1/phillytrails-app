import "./App.css";
import Header from "./components/Map/Map";
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
            <Header />
          </div>
        </Route>
        <Route exact path="/route/:id" children={<DirectRoute />} />
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
        <Header id={id} />
      </div>
    </div>
  );
}
