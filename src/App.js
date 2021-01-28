import { Fragment, Component } from "react";
import ResultsList from "./components/ResultsList/ResultsList";
import SearchBox from "./components/SearchBox/SearchBox";
import Facet from "./components/Facet/Facet";
import Tabs from "./components/tabs/tabs";
class App extends Component {
  render() {
    return (
      <Fragment>
        <Tabs />
        <div className="container">
          <SearchBox />
        </div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Facet />
            </div>
            <div className="col-9">
              <ResultsList />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
