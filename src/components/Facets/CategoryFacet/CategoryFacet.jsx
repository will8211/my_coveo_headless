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
          className="btn btn-dark bg-transparent btn-sm"
          onClick={() => this.headlessCategoryFacet.toggleSelect(val)}
        >{val.value}</button>
        <br />
      </Fragment>
    ))
  }

  renderMoreLessButtons() {
    const buttons = Fragment;
    const classes = "btn btn-dark bg-transparent btn-sm font-weight-bold"

    const moreButton = (
      <button
        className={classes}
        onClick={() => this.headlessCategoryFacet.showMoreValues()}
      >&nbsp;More ↓</button>
    )

    const lessButton = (
      <button
        className={classes}
        onClick={() => this.headlessCategoryFacet.showLessValues()}
      >&nbsp;Less ↑</button>
    )

    return (
      <Fragment>
        {this.state.canShowMoreValues && moreButton}
        {this.state.canShowLessValues && lessButton}
      </Fragment>
    )
  }

  renderBackButton() {
    return this.state.parents.length > 0 && (
      <Fragment>
        <button
          className="btn btn-dark bg-transparent btn-sm font-weight-bold"
          onClick={() => this.headlessCategoryFacet.deselectAll()}
        >&nbsp;← Reset</button>
        <br />
      </Fragment>
    )
  }

  renderSearchBox() {
    return (
      <input
        type="text"
        className="form-control input-sm"
        value={this.state.value}
        onKeyUp={(e) => {
          e.key === 'Enter' && this.headlessCategoryFacet.facetSearch.search();
        }}
        onChange={(e) => {
          this.headlessCategoryFacet.facetSearch.updateText(e.target.value);
          this.state.searchAsYouType && this.headlessCategoryFacet.facetSearch.search();
        }}
      />
    )
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h6 className="card-title font-weight-bold">{this.title}</h6>
          {this.renderSearchBox()}
          {this.renderBackButton()}
          {this.renderValues()}
          {this.renderMoreLessButtons()}
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