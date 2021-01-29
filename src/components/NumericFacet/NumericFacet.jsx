import { Component } from "react";
import { engine } from "../../engine";
import { buildNumericFacet } from "@coveo/headless";
import './Facet.css'

class Facet extends Component {
  constructor(props) {
    super(props);
    const options = {
      field: props.field,
      facetId: props.facetId,
      numberOfValues: 4,
      generateAutomaticRanges: props.generateAutomaticRanges,
      currentValues: [
        buildNumericRange({
          start: 0,
          end: 1000
        }),
        buildNumericRange({
          start: 1001,
          end: 10000
        }),
        buildNumericRange({
          start: 10001,
          end: 10000
        })
      ]
    };
    this.headlessNumericFacet = buildNumericFacet(engine, { options });
    this.state = this.headlessNumericFacet.state;
  }

  componentDidMount() {
    this.headlessNumericFacet.subscribe(() => {
      this.setState(this.headlessNumericFacet.state);
    });
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">
            Numeric Facet
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
  }
}


export default Facet;
