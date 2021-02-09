import { Component, Fragment } from 'react';
import { engine } from "../../../engine";
import { buildCategoryFacet } from '@coveo/headless';
import './CategoryFacet.css'

class CategoryFacet extends Component {

  constructor(props) {
    super(props);
    const options = {
      field: props.field,
      delimitingCharacter: props.delimitingCharacter,
      numberOfValues: props.numberOfValues,
      facetSearch: {
        numberOfValues: props.numberOfValues
      },
      basePath: props.basePath,
      filterByBasePath: props.filterByBasePath
    }
    this.id = props.id
    this.title = props.title
    this.headlessCategoryFacet = buildCategoryFacet(engine, { options });
    this.state = this.headlessCategoryFacet.state;
    this.state.searchBoxValue = "";
    this.state.showSuggestions = false;
  }

  componentDidMount() {
    this.headlessCategoryFacet.subscribe(() => {
      this.setState(this.headlessCategoryFacet.state);
    });
  }

  renderValues() {
    return this.state.values.map((val, i) => (
      <Fragment key={this.id + i}>
        <button
          className="btn btn-dark bg-transparent btn-sm text-left"
          onClick={() => this.headlessCategoryFacet.toggleSelect(val)}
        >{val.value} ({val.numberOfResults})</button>
        <br />
      </Fragment>
    ))
  }

  renderMoreLessButtons() {
    const classes = "btn btn-dark bg-transparent btn-sm font-weight-bold"

    const lessButton = (
      <button
        className={classes}
        onClick={() => this.headlessCategoryFacet.showLessValues()}
      >&nbsp;Less ↑</button>
    )

    const moreButton = (
      <button
        className={classes}
        onClick={() => this.headlessCategoryFacet.showMoreValues()}
      >&nbsp;More ↓</button>
    )

    return (
      <Fragment>
        {this.state.canShowLessValues && lessButton}
        {this.state.canShowMoreValues && moreButton}
      </Fragment>
    )
  }

  renderBackButton() {
    return this.state.parents.length > 0 && (
      <Fragment>
        <button
          className="btn btn-dark bg-transparent btn-sm font-weight-bold"
          onClick={() => {
            this.headlessCategoryFacet.deselectAll();
          }}
        >&nbsp;← Back</button>
        <br />
      </Fragment>
    )
  }

  renderSearchBox() {
    return (
      <div className="search-container">
        <input
          type="text"
          value={this.state.searchBoxValue}
          className="form-control form-control-sm"
          onFocus={() => {
            this.state.searchBoxValue.length > 0 && this.setState({ showSuggestions: true });
          }}
          onKeyUp={(e) => {
            e.key === 'Enter' &&
              this.state.searchBoxValue.length > 0 &&
              this.handleSuggestionClick(this.state.searchBoxValue);
          }}
          onChange={(e) => {
            this.headlessCategoryFacet.facetSearch.updateText(e.target.value);
            this.setState({ 'searchBoxValue': e.target.value });
            this.setState({ showSuggestions: true });
            this.headlessCategoryFacet.facetSearch.search();
          }}
        />
        {this.renderSuggestions()}
      </div>
    )
  }

  renderSuggestions() {
    return (
      <div className="suggestions">
        {this.state.searchBoxValue.length > 0 &&
          this.state.showSuggestions === true &&
          this.state.facetSearch.values.map((val, i) => (
            <Fragment>
              <button
                className="suggestion-item btn btn-secondary btn-sm text-left"
                key={val.rawValue}
                onClick={() => this.handleSuggestionClick(val)}
              >{val.displayValue}</button>
              <br />
            </Fragment>
          ))
        }
      </div>
    )
  }

  handleSuggestionClick = (val) => {
    this.headlessCategoryFacet.deselectAll();
    const treeValue = this.searchResultToTreeValue(val);
    this.headlessCategoryFacet.toggleSelect(treeValue);
    this.setState({ 'showSuggestions': false });
    this.setState({ 'searchBoxValue': val.rawValue });
  }

  searchResultToTreeValue(searchResult) {
    const treeValue = {
      children: [],
      isLeafValue: true,
      numberOfResults: searchResult.count,
      path: searchResult.path.concat([searchResult.rawValue]),
      value: searchResult.rawValue
    };
    console.log(treeValue.children);
    console.log(treeValue.isLeafValue);
    console.log(treeValue.numberOfResults);
    console.log(treeValue.path);
    console.log(treeValue.value);

    return treeValue;
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h6 className="card-title font-weight-bold">{this.title}</h6>
          {this.renderSearchBox()}
          <div>
            {this.renderBackButton()}
            {this.renderValues()}
            {this.renderMoreLessButtons()}
          </div>
        </div>
      </div>
    )
  }
}

export default class CategoryFacets extends Component {
  render() {
    return (
      <Fragment>
        <CategoryFacet
          field="geographicalhierarchy"
          delimitingCharacter=';'
          numberOfValues={5}
          basePath={[]}
          filterByBasePath={false}
          title='Geography'
          id="geo"
        />
      </Fragment>
    )
  }
}