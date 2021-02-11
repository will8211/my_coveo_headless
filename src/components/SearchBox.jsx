import { Component, Fragment } from 'react';
import { engine } from "../engine";
import { buildSearchBox } from "@coveo/headless";
import "../styles/SearchBox.css";
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
  }

  componentDidMount() {
    this.headlessSearchBox.subscribe(() => {
      this.setState(this.headlessSearchBox.state);
    })
    this.headlessSearchBox.submit();
  }

  renderTextInput() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            className="btn btn-primary"
            onClick={this.headlessSearchBox.submit}
            disabled={this.state.searchAsYouType}
          >
            Search
          </button>
        </div>

        <input
          type="text"
          className="form-control"
          value={this.state.value}
          onKeyUp={(e) => {
            e.key === 'Enter' && this.headlessSearchBox.submit();
          }}
          onChange={(e) => {
            this.headlessSearchBox.updateText(e.target.value);
            this.state.searchAsYouType && this.headlessSearchBox.submit();
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


  renderSuggestions() {
    const badgeClasses = "btn badge badge-secondary m-1";

    return (
      <Fragment>
        <span>Suggestions: </span>

        {this.state.suggestions.length === 0 && (
          <button
            className={badgeClasses}
            onClick={this.headlessSearchBox.showSuggestions}
          >
            ↦
          </button>
        )}

        {this.state.suggestions.map((suggestion) => (
          <button
            key={Math.random().toString()}
            className={badgeClasses}
            onClick={() => {
              this.headlessSearchBox.updateText(suggestion.rawValue);
              this.headlessSearchBox.submit();
            }}
          >
            {suggestion.rawValue}
          </button>
        ))}

        {this.state.suggestions.length > 0 && (
          <button
            className={badgeClasses}
            onClick={this.headlessSearchBox.hideSuggestions}
          >
            ↤
          </button>
        )}
        {this.props.children}
      </Fragment>
    )
  }

  renderSearchControl() {
    return (
      <div className="input-group mt-2">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="searchAsYouType"
            onChange={() => {
              this.setState({ searchAsYouType: !this.state.searchAsYouType })
            }}
          />

          <label
            className="form-check-label"
            htmlFor="searchAsYouType"
          >
            Search as you type
          </label>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="card mt-4">
        <div className="card-body">
          {this.renderTextInput()}
          <div className="row">
            <div className="col-md-8">
              {this.props.children}
            </div>
            <div className="col-md-3">
              <span className="float-right">
                {this.renderSearchControl()}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBox;