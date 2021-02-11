import { Component, Fragment } from "react";
import { engine } from "../../../engine";
import { buildNumericFacet, buildNumericRange } from "@coveo/headless";

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

  numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
          checked={this.headlessNumericFacet.isValueSelected(value)}
          onChange={() => this.headlessNumericFacet.toggleSelect(value)}
        />
        <label
          className="form-check-label small"
          htmlFor={this.facetId + i}
        >
          {this.numberWithCommas(value.start)} - {this.numberWithCommas(value.end)}
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
            buildNumericRange({ start: 0, end: 1000 }),
            buildNumericRange({ start: 1000, end: 10_000 }),
            buildNumericRange({ start: 10_000, end: 100_000 }),
            buildNumericRange({ start: 100_000, end: 1_000_000 }),
          ]}
        />
      </Fragment>
    )
  }
}
