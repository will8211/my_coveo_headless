import { Fragment, Component } from "react";
import Tabs from "./components/Tabs/Tabs";
import SearchBox from "./components/SearchBox/SearchBox";
import QuerySummary from "./components/QuerySummary/QuerySummary";
import ResultsList from "./components/ResultsList/ResultsList";
import Pager from "./components/Pager/Pager";
import ResultsPerPage from "./components/ResultsPerPage/ResultsPerPage";
import NumericFacets from "./components/NumericFacet/NumericFacet";
import coveoLogo from "./coveo_logo.png";

class App extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark">
          <img className="navbar-brand" src={coveoLogo} alt="Coveo" />
          <Tabs />
        </nav>
        <div className="container">
          <SearchBox />
          <br />
          <div className="row">
            <div className="col-md-9 order-md-2">
              <QuerySummary />
              <ResultsList />
              <div className="row m-1 d-flex justify-content-between">
                <Pager />
                <ResultsPerPage />
              </div>
            </div>
            <div className="col-md-3 order-md-1">
              <NumericFacets />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;