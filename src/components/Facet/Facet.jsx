import { Component } from "react";
import { engine } from "../../engine";
import { buildQuerySummary } from "@coveo/headless";

class Facet extends Component {
  constructor(props) {
    super(props);
    this.headlessQuerySummary = buildQuerySummary(engine);
    this.state = this.headlessQuerySummary.state;
  }

  componentDidMount() {
    this.headlessQuerySummary.subscribe(() => {
      this.setState(this.headlessQuerySummary.state);
    });
  }

  render() {
    if (this.state.hasResults) {
      return (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title font-weight-bold">
              Facet - Not done yet
            </h5>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="someFacet"
              />
              <label className="form-check-label" htmlFor="someFacet">
                Placeholder
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="someFacet"
              />
              <label className="form-check-label" htmlFor="someFacet">
                Placeholder
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="someFacet"
              />
              <label className="form-check-label" htmlFor="someFacet">
                Placeholder
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Facet;
