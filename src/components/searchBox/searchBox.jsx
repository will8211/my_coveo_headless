import "./SearchBox.css";
import React, { Component } from 'react';
import { engine } from "../../engine";
import { buildSearchBox } from "@coveo/headless";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

class SearchBox extends Component {
  state = {}

  constructor(props) {
    super(props);
    const options = {
      numberOfSuggestions: 5,
      enableQuerySyntax: true
    };
    this.headlessSearchBox = buildSearchBox(engine, { options });
    this.state = this.headlessSearchBox.state;
  }

  componentDidMount() {
    this.headlessSearchBox.subscribe(() => this.setState(this.headlessSearchBox.state))
  }

  render() {
    return (
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">Standalone Search Box</h5>
          <input
            type="text"
            className="form-control m-1"
            value={this.state.value}
            id="StandaloneSearchBox"
            onChange={(e) => this.headlessSearchBox.updateText(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && this.headlessSearchBox.submit()}
          />
          <button className="btn btn-primary m-1" onClick={this.headlessSearchBox.submit}>Submit</button>
          <button className="btn btn-primary m-1" onClick={this.headlessSearchBox.clear}>Clear</button>
          <br />
          {this.state.suggestions.length > 0 && <span>Suggestions:</span>}
          {this.state.suggestions.map((suggestion) => (
            <a><span className="badge badge-secondary m-1">{suggestion.rawValue}</span></a>
          ))}
        </div>
      </div>
    )
  }
}

export default SearchBox;