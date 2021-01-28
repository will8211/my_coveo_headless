import "./SearchBox.css";
import React, { Component } from 'react';
import { engine } from "../../engine";
import { buildSearchBox } from "@coveo/headless";

class SearchBox extends Component {

  constructor(props) {
    super(props);
    const options = {
      numberOfSuggestions: 5,
      enableQuerySyntax: true
    };
    this.headlessSearchBox = buildSearchBox(engine, { options });
    this.state = this.headlessSearchBox.state;
    this.state.searchAsYouType = false;
  }

  componentDidMount() {
    this.headlessSearchBox.subscribe(() => this.setState(this.headlessSearchBox.state))
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">Search Box</h5>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-primary"
                onClick={this.headlessSearchBox.submit}
                disabled={this.state.searchAsYouType}
              >
                Submit
              </button>
            </div>
            <input
              type="text"
              className="form-control"
              value={this.state.value}
              id="StandaloneSearchBox"
              onChange={(e) => {
                this.headlessSearchBox.updateText(e.target.value);
                this.state.searchAsYouType && this.headlessSearchBox.submit();
              }}
              onKeyUp={(e) => e.key === 'Enter' && this.headlessSearchBox.submit()}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                onClick={this.headlessSearchBox.clear}
              >
                ✕
              </button>
            </div>
          </div>
          {this.state.suggestions.length > 0 ? <span>Suggestions: </span> : <span> &nbsp;</span>}
          {this.state.suggestions.map((suggestion) =>
          (
            <button 
              key={Math.random().toString()}
              className="btn badge badge-secondary m-1"
              onClick={() => {
                this.headlessSearchBox.updateText(suggestion.rawValue);
                this.headlessSearchBox.submit();
              }}
            >
              {suggestion.rawValue}
            </button>
          )
          )}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="searchAsYouType"
              onChange={() => this.setState({ searchAsYouType: !this.state.searchAsYouType })}
            />
            <label className="form-check-label" htmlFor="searchAsYouType">Search as you type</label>
          </div>
          <button
            className="btn btn-secondary m-1"
            onClick={this.headlessSearchBox.showSuggestions}
          >
            Show suggestions
          </button>
          <button
            className="btn btn-secondary m-1"
            onClick={this.headlessSearchBox.hideSuggestions}
          >
            Hide suggestions
          </button>
        </div>
      </div>
    )
  }
}

export default SearchBox;