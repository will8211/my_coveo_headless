import { Component, Fragment } from 'react';
import { engine } from "../engine";
import { buildSearchBox } from "@coveo/headless";
import Sort from "./Sort";
import "../styles/SearchBox.css";
import "../styles/FacetSearch.css";
class SearchBox extends Component {

  constructor(props) {
    super(props);

    const options = {
      numberOfSuggestions: 5,
      enableQuerySyntax: false
    };

    this.headlessSearchBox = buildSearchBox(engine, { options });
    this.state = this.headlessSearchBox.state;
    this.state.searchAsYouType = false;
    this.state.showSuggestions = false;
  }

  componentDidMount() {
    this.headlessSearchBox.subscribe(() => {
      this.setState(this.headlessSearchBox.state);
    })
    this.headlessSearchBox.submit();
  }

  renderTextInput() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={this.state.value}
          onKeyUp={(e) => {
            e.key === 'Enter' && this.headlessSearchBox.hideSuggestions();
          }}
          onChange={(e) => {
            this.headlessSearchBox.updateText(e.target.value);
            this.headlessSearchBox.submit();
            this.setState({ showSuggestions: true });
          }}
        />

        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            onClick={this.headlessSearchBox.clear}
          >
            ✕
          </button>
        </div>
      </div >
    )
  }

  renderSuggestions = () => {
    return (
      <div className="suggestions">
        {this.state.suggestions.length > 0 &&
          this.state.showSuggestions === true &&
          this.state.suggestions.map((suggestion, i) => (
            <Fragment key={i}>
              <button
                className="suggestion-item btn btn-secondary btn-sm text-left"
                onClick={() => this.handleSuggestionClick(suggestion)}
              >
                {suggestion.rawValue}
              </button>
              <br />
            </Fragment>
          ))
        }
      </div>
    )
  }

  handleSuggestionClick = (selection) => {
    this.headlessSearchBox.updateText(selection.rawValue);
    this.headlessSearchBox.submit();
    this.setState({ 'showSuggestions': false });
    this.setState({ 'value': selection.rawValue });
  }

  render() {
    return (
      <div className="card mt-4">
        <div className="card-body">
          {this.renderTextInput()}
          {this.renderSuggestions()}
          <div className="row">
            <div className="col-md-7">
              {this.props.children}
            </div>
            <div className="col-md-5 mt-3">
              <span className="float-right">
                <Sort />
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBox;