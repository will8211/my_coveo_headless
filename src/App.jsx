import { Fragment, Component } from "react";
import Tabs from "./components/Tabs/Tabs";
import History from "./components/History/History";
import SearchBox from "./components/SearchBox/SearchBox";
import QuerySummary from "./components/QuerySummary/QuerySummary";
import QueryError from "./components/QueryError/QueryError";
import Sort from "./components/Sort/Sort";
import ResultsList from "./components/ResultsList/ResultsList";
import Pager from "./components/Pager/Pager";
import ResultsPerPage from "./components/ResultsPerPage/ResultsPerPage";
import NumericFacets from "./components/Facets/NumericFacet/NumericFacet";
import coveoLogo from "./coveo_logo.png";
import DateFacet from "./components/Facets/DateFacet/DateFacet";

class App extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark 
                        justify-content-between">
          <img className="navbar-brand" src={coveoLogo} alt="Coveo" />
          <Tabs />
          <div className="nav-item nav-link">
            <History />
          </div>
        </nav>
        <div className="container">
          <SearchBox />
          <br />
          <div className="row">
            <div className="col-md-9 order-md-2">
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <QuerySummary />
                </div>
                <div className="col-md-6">
                  <Sort />
                </div>
              </div>
              <QueryError />
              <ResultsList />
              <div className="row m-1 d-flex justify-content-between">
                <Pager />
                <ResultsPerPage />
              </div>
            </div>
            <div className="col-md-3 order-md-1">
              <NumericFacets />
              <DateFacet />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
