import { Fragment, Component } from "react";
import Tabs from "./components/Tabs/Tabs";
import SearchBox from "./components/SearchBox/SearchBox";
import QuerySummary from "./components/QuerySummary/QuerySummary";
import ResultsList from "./components/ResultsList/ResultsList";
import Pager from "./components/Pager/Pager";
import ResultsPerPage from "./components/ResultsPerPage/ResultsPerPage";
import Facet from "./components/Facet/Facet";
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
          <div className="row justify-content-lg-center">
            <div className="col-lg-9 col-md-12">
              <SearchBox />
            </div>
          </div>
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
              <Facet />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
