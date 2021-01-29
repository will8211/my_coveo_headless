import { Fragment, Component } from "react";
import ResultsList from "./components/ResultsList/ResultsList";
import SearchBox from "./components/SearchBox/SearchBox";
import Facet from "./components/Facet/Facet";
import Tabs from "./components/Tabs/Tabs";
import QuerySummary from "./components/QuerySummary/QuerySummary";
import Pager from "./components/Pager/Pager";
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
            <div className="col-sm-9 order-sm-2">
              <QuerySummary />
              <Pager />
              <ResultsList />
            </div>
            <div className="col-sm-3 order-sm-1">
              <Facet />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
