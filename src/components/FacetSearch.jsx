import React, { Component, Fragment } from 'react';
import "../styles/FacetSearch.css";

class FacetSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSuggestions: false,
      searchBoxValue: '',
      facetSearch: this.props.facetSearchState,
      externalData: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.facetSearchState !== state.facetSearch) {
      return {
        facetSearch: props.facetSearchState,
      };
    }
    return null;
  }

  handleChange = (e) => {
    this.props.updateText(e.target.value);
    this.setState({ 'searchBoxValue': e.target.value });
    this.setState({ showSuggestions: true });
    this.props.search();
  }

  handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') &&
      this.state.searchBoxValue.length > 0 &&
      this.state.facetSearch.values.length > 0
    ) {
      const value = this.state.facetSearch.values[0];
      this.makeSelection(value);
    }
  }

  makeSelection = (value) => {
    this.props.updateText(value.rawValue);
    this.props.select(value);
    this.setState({ 'showSuggestions': false });
    this.setState({ 'searchBoxValue': value.rawValue });
  }

  handleFocus = () => {
    if (this.state.searchBoxValue.length > 0) {
      this.setState({ showSuggestions: true });
    }
  }

  handleBlur = () => {
    if (this.state.searchBoxValue.length > 0) {
      this.setState({ showSuggestions: false });
    }
  }

  handleSuggestionClick = (value) => {
    this.makeSelection(value);
  }

  renderSuggestions = () => {
    return (
      <div className="suggestions">
        {this.state.searchBoxValue.length > 0 &&
          this.state.showSuggestions === true &&
          this.state.facetSearch.values.map((val, i) => (
            <Fragment key={i}>
              <button
                className="suggestion-item btn btn-secondary btn-sm text-left"
                onClick={() => this.handleSuggestionClick(val)}
              >
                {val.displayValue}
              </button>
              <br />
            </Fragment>
          ))
        }
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <input
          type="text"
          value={this.state.searchBoxValue}
          placeholder="Search"
          className="form-control form-control-sm"
          onFocus={this.handleFocus}
          // onBlur={this.handleBlur}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
        />
        {this.renderSuggestions()}
      </Fragment>
    )
  }
}

export default FacetSearch;