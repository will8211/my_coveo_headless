import React, { Component, Fragment } from 'react';

class FacetSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSuggestions: false,
      searchBoxValue: '',
      facetState: this.props.facetState,
      externalData: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.facetState !== state.facetState) {
      return {
        facetState: props.facetState,
      };
    }
    return null;
  }

  renderSuggestions = () => {
    return (
      <div className="suggestions">
        {this.state.searchBoxValue.length > 0 &&
          this.state.showSuggestions === true &&
          this.state.facetState.values.map((val, i) => (
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

  handleSuggestionClick = (val) => {
    this.props.updateText(val.rawValue);
    this.props.select(val);
    this.setState({ 'showSuggestions': false });
    this.setState({ 'searchBoxValue': val.rawValue });
  }

  render() {
    return (
      <Fragment>
        <input
          type="text"
          value={this.state.searchBoxValue}
          className="form-control form-control-sm"
          onFocus={() => {
            this.state.searchBoxValue.length > 0 &&
              this.setState({ showSuggestions: true });
          }}
          onChange={(e) => {
            this.props.updateText(e.target.value);
            this.setState({ 'searchBoxValue': e.target.value });
            this.setState({ showSuggestions: true });
            this.props.search();
          }}
        />
        {this.renderSuggestions()}
      </Fragment>
    )
  }
}

export default FacetSearch;