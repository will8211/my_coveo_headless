import React, { Component, Fragment } from 'react';

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



  handleChange = (e) => {
    this.props.updateText(e.target.value);
    this.setState({ 'searchBoxValue': e.target.value });
    this.setState({ showSuggestions: true });
    this.props.search();
  }

  handleKeyUp = (e) => {
    if (e.key === 'Enter' &&
      this.state.searchBoxValue.length > 0 &&
      this.state.facetSearch.values.length > 0
    ) {
      const value = this.state.facetSearch.values[0];
      this.makeSelection(value);
    }
  }

  handleSuggestionClick = (value) => {
    this.makeSelection(value);
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

  render() {
    return (
      <Fragment>
        <input
          type="text"
          value={this.state.searchBoxValue}
          className="form-control form-control-sm"
          onFocus={this.handleFocus}
          onChange={(e) => this.handleChange(e)}
          onKeyUp={(e) => this.handleKeyUp(e)}
        />
        {this.renderSuggestions()}
      </Fragment>
    )
  }
}

export default FacetSearch;