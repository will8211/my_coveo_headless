import { Fragment, Component } from "react";
import Tabs from "./components/Tabs";
import History from "./components/History";
import SearchBox from "./components/SearchBox";
import BreadcrumbManager from "./components/BreadcrumbManager";
import DidYouMean from "./components/DidYouMean";
import QuerySummary from "./components/QuerySummary";
import QueryError from "./components/QueryError";
import Sort from "./components/Sort";
import ResultsList from "./components/ResultsList";
import Pager from "./components/Pager";
import ResultsPerPage from "./components/ResultsPerPage";
import NumericFacets from "./components/NumericFacet";
import DateFacets from "./components/DateFacet";
import Facets from "./components/Facet";
import CategoryFacet from "./components/CategoryFacet";
import FacetManager from "./components/FacetManager";
import coveoLogo from "./coveo_logo.png";

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
          <SearchBox>
            <DidYouMean />
            <BreadcrumbManager />
          </SearchBox>
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
              <FacetManager>
                <Facets />
                <NumericFacets />
                <DateFacets />
                <CategoryFacet />
              </FacetManager>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
