import { Component } from 'react';
import { engine } from "../engine";
import { buildFacet } from '@coveo/headless';
import FacetSearch from "./FacetSearch"

class Facet extends Component {

  constructor(props) {
    super(props);
    const options = {
      field: props.field,
      facetId: props.facetId,
      numberOfValues: 8,
      facetSearch: {
        numberOfValues: 5
      }
    };
    this.headlessFacet = buildFacet(engine, { options });
    this.state = this.headlessFacet.state;
    this.title = props.title;
    this.state.searchBoxValue = '';
  }

  componentDidMount() {
    this.headlessFacet.subscribe(() => {
      this.setState(this.headlessFacet.state);
    });
  }

  renderCheckboxes() {
    return this.state.values.map((value, i) => (
      <div
        className="form-check"
        key={i}
      >
        <input
          type="checkbox"
          className="form-check-input"
          id={i}
          checked={this.headlessFacet.isValueSelected(value)}
          onChange={() => this.headlessFacet.toggleSelect(value)}
        />
        <label
          className="form-check-label small"
          htmlFor={i}
        >
          {value.value}
        </label>
      </div>
    ))
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h6 className="card-title font-weight-bold">
            {this.title}
          </h6>
          <FacetSearch
            updateText={this.headlessFacet.facetSearch.updateText}
            search={this.headlessFacet.facetSearch.search}
            select={this.headlessFacet.facetSearch.select}
            facetState={this.state.facetSearch}
          />
          {this.renderCheckboxes()}
        </div>
      </div>
    );
  }
}

export default Facet;
