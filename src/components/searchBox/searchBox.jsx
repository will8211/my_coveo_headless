import "./SearchBox.css";
import React, { Component } from 'react';
import { engine } from "../../engine";
import { buildSearchBox } from "@coveo/headless";

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
          <h5 className="card-title">Standalone Search Box</h5>
          <input
            type="text"
            className="form-control m-1"
            value={this.state.value}
            id="StandaloneSearchBox"
            onChange={(event) => {
              console.log('Updated text');
              this.headlessSearchBox.updateText(event.target.value);
              this.setState({value: event.target.value});
            }}
          />
          <button className="btn btn-primary m-1" onClick={this.headlessSearchBox.submit}>Submit</button>
          <button className="btn btn-primary m-1" onClick={this.headlessSearchBox.clear}>Clear</button>
          <h5>Suggestions</h5>
          {this.state.suggestions.map((suggestion) => (
            <p>
              {suggestion.rawValue}
            </p>
          ))}
        </div>
      </div>
    )
  }
}

export default SearchBox;