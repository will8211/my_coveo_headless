import { Component } from 'react';
import { engine } from "../../../engine";
import { buildFacet } from '@coveo/headless';
import FacetSearch from "../FacetSearch/FacetSearch"

class DynamicFacet extends Component {

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
    this.headlessDynamicFacet = buildFacet(engine, { options });
    this.state = this.headlessDynamicFacet.state;
    this.title = props.title;
    this.state.searchBoxValue = '';
  }

  componentDidMount() {
    this.headlessDynamicFacet.subscribe(() => {
      this.setState(this.headlessDynamicFacet.state);
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
          checked={this.headlessDynamicFacet.isValueSelected(value)}
          onChange={() => this.headlessDynamicFacet.toggleSelect(value)}
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
            updateText={this.headlessDynamicFacet.facetSearch.updateText}
            search={this.headlessDynamicFacet.facetSearch.search}
            select={this.headlessDynamicFacet.facetSearch.select}
            facetState={this.state.facetSearch}
          />
          {this.renderCheckboxes()}
        </div>
      </div>
    );
  }
}

export default class DynamicFacets extends Component {
  render() {
    return (
      <DynamicFacet
        title="File Type"
        field="filetype"
        facetId="filetype"
      />
    )
  }
}