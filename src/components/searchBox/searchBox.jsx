import "./searchBox.css";
import { engine } from "../../engine";
import { Component } from 'react';
import { buildSearchBox } from "@coveo/headless";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class MySearchBox extends Component {

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

  render() {
    return (
      <div className="row justify-content-center main rounded">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card card-sm" onSubmit={this.handleSubmit}>
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <FontAwesomeIcon icon={faSearch} size="lg" />
              </div>
              <div className="col">
                <Autocomplete
                  inputValue={this.state.value}
                  onInputChange={(event, newInputValue) => {
                    this.headlessSearchBox.updateText(newInputValue);
                  }}
                  onClick={(e) => this.selectOnFocus(e)}
                  onChange={() => {
                    this.headlessSearchBox.submit();
                  }}
                  onFocus={() => {
                    this.headlessSearchBox.showSuggestions();
                  }}
                  id="ReactSearchHeadless"
                  freeSolo
                  options={this.state.suggestions.map(
                    (suggestion) => suggestion.rawValue
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="filled"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MySearchBox;