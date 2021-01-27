import { Fragment, Component } from "react";
import Tabs from "./components/tabs/tabs.jsx";
import ResultsList from "./components/resultsList/resultsList";
import MySearchBox from "./components/searchBox/searchBox";
import SearchBox from "./components/standaloneSearchBox/standaloneSearchBox.jsx";

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* <Tabs /> */}
        <div className="container">
          <SearchBox />
        </div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-3">Facets go here</div>
            <div className="col-9"><ResultsList /></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
