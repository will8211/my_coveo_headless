import { Component, Fragment } from "react";
import { engine } from "../../../engine";
import { buildNumericFacet, buildNumericRange } from "@coveo/headless";
import './NumericFacet.css'

class NumericFacet extends Component {
  constructor(props) {
    super(props);
    const options = {
      field: props.field,
      facetId: props.facetId,
      numberOfValues: props.numberOfValues,
      generateAutomaticRanges: props.generateAutomaticRanges,
      currentValues: props.currentValues
    };
    this.title = props.title;
    this.facetId = props.facetId;
    this.headlessNumericFacet = buildNumericFacet(engine, { options });
    this.state = this.headlessNumericFacet.state;
  }

  componentDidMount() {
    this.headlessNumericFacet.subscribe(() => {
      this.setState(this.headlessNumericFacet.state);
    });
  }

  renderCheckboxes() {
    return this.state.values.map((value, i) => (
      <div
        className="form-check"
        key={this.facetId + i}
      >
        <input
          type="checkbox"
          className="form-check-input"
          id={this.facetId + i}
          onChange={() => this.headlessNumericFacet.toggleSelect(value)}
        />
        <label
          className="form-check-label small"
          htmlFor={this.facetId + i}
        >
          {value.start} - {value.end}
        </label>
      </div>
    ))
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h6 className="card-title font-weight-bold">
            {this.title}
          </h6>
          {this.renderCheckboxes()}
        </div>
      </div>
    );
  }
}

export default class NumericFacets extends Component {
  render() {
    return (
      <Fragment>
        <NumericFacet
          title="Youtube Views"
          field="ytviewcount"
          facetId="ytviewcount_numeric"
          numberOfValues={3}
          generateAutomaticRanges={false}
          currentValues={[
            buildNumericRange({ start: 0, end: 999 }),
            buildNumericRange({ start: 1000, end: 9999 }),
            buildNumericRange({ start: 10000, end: 99999 })
          ]}
        />
      </Fragment>
    )
  }
}
