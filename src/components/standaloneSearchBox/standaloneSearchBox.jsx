import { CardContent } from '@material-ui/core';
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
    this.headlessSearchBox.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessSearchBox.state);
  }

  selectOnFocus(e) {
    const value = e.target.value;
    this.headlessSearchBox.selectSuggestion(value);
  }

  myClick() {
    alert("Hello World!");
  }

  render() {
    return (
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title">Standalone Search Box</h5>
          <input
            type="text"
            className="form-control"
            inputValue={this.state.value}
            onInputChange={(event, newInputValue) => { this.headlessSearchBox.updateText(newInputValue) }}
            onClick={(e) => this.selectOnFocus(e)}
            onChange={() => { this.headlessSearchBox.submit() }}
            onFocus={() => { this.headlessSearchBox.showSuggestions() }}
            id="StandaloneSearchBox"
          />
          <a href="#" className="btn btn-primary">Go somewhere</a>

          <h5>Suggestions</h5>
          {this.state.suggestions.map(
            (suggestion) => (
              <React.Fragment>
                <a
                  onClick={() => {
                    this.setState({
                      value: this.state.value + ' ' + suggestion.rawValue
                    });
                    this.headlessSearchBox.updateText(this.state.value);
                  }}
                >
                  {suggestion.rawValue}
                </a>
                <br />
              </React.Fragment>
            )
          )}
        </div>
      </div>
    );
  }
}

export default SearchBox;