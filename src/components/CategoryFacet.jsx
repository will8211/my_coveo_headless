import { Component, Fragment } from 'react';
import { engine } from "../engine";
import { buildCategoryFacet } from '@coveo/headless';
import '../styles/CategoryFacet.css'
import FacetSearch from "./FacetSearch"

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
      <Fragment key={i}>
        <button
          className="btn btn-dark bg-transparent btn-sm text-left small"
          onClick={() => this.headlessCategoryFacet.toggleSelect(val)}
        ><span className='smaller-text'>{val.value} ({val.numberOfResults})</span></button>
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

  handleSuggestionClick = (val) => {
    this.headlessCategoryFacet.deselectAll();
    this.headlessCategoryFacet.facetSearch.updateText(val.rawValue);
    this.headlessCategoryFacet.facetSearch.select(val);
    this.setState({ 'showSuggestions': false });
    this.setState({ 'searchBoxValue': val.rawValue });
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h6 className="card-title font-weight-bold">{this.title}</h6>
          <FacetSearch
            updateText={this.headlessCategoryFacet.facetSearch.updateText}
            search={this.headlessCategoryFacet.facetSearch.search}
            select={this.headlessCategoryFacet.facetSearch.select}
            facetSearchState={this.state.facetSearch}
          />
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

export default CategoryFacet;