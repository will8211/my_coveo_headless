import { Fragment, Component } from "react";
import coveoLogo from "./coveo_logo.png";
import BreadcrumbManager from "./components/BreadcrumbManager";
import CategoryFacet from "./components/CategoryFacet";
import DateFacet from "./components/DateFacet";
import DidYouMean from "./components/DidYouMean";
import Facet from "./components/Facet";
import FacetManager from "./components/FacetManager";
import History from "./components/History";
import NumericFacet from "./components/NumericFacet";
import Pager from "./components/Pager";
import QueryError from "./components/QueryError";
import QuerySummary from "./components/QuerySummary";
import ResultsList from "./components/ResultsList";
import ResultsPerPage from "./components/ResultsPerPage";
import SearchBox from "./components/SearchBox";
import Tab from "./components/Tab";

class App extends Component {
  render() {
    return (
      <Fragment>

        <nav className="navbar navbar-expand-sm navbar-dark 
                        justify-content-between">
          <img className="navbar-brand" src={coveoLogo} alt="Coveo" />
          <div className="navbar-nav">
            <Tab tabExpression="" label="ALL CONTENT" />
            <Tab tabExpression="@filetype==youtubevideo" label="YOUTUBE" />
            <Tab tabExpression="@sfid" label="SALESFORCE" />
            <Tab tabExpression="@filetype==pdf" label="PDF DOCS" />
          </div>
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
                <div className="col-md-12">
                  <QuerySummary />
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
                <Facet
                  title="File Type"
                  field="filetype"
                  facetId="filetype"
                />
                <NumericFacet
                  title="Youtube Views"
                  field="ytviewcount"
                  facetId="ytviewcount_numeric"
                  numberOfValues={3}
                  generateAutomaticRanges={false}
                  currentValues={[
                    { start: 0, end: 1000 },
                    { start: 1000, end: 10_000 },
                    { start: 10_000, end: 100_000 },
                    { start: 100_000, end: 1_000_000 },
                  ]}
                />
                <DateFacet
                  title="Date Range"
                  field="date"
                  facetId="date"
                  generateAutomaticRanges={false}
                  currentValues={[
                    { start: "2005/01/01", end: "2009/12/31" },
                    { start: "2010/01/01", end: "2014/12/31" },
                    { start: "2015/01/01", end: "2019/12/31" },
                    { start: "2020/01/01", end: "2021/12/31" },
                  ]}
                />
                <CategoryFacet
                  field="geographicalhierarchy"
                  delimitingCharacter=';'
                  numberOfValues={5}
                  basePath={[]}
                  filterByBasePath={false}
                  title="Geography"
                />
              </FacetManager>
            </div>

          </div>

        </div>

      </Fragment>
    );
  }
}

export default App;
