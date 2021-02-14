import { Component } from 'react';
import { engine } from "../engine";
import { buildDateFacet, buildDateRange } from '@coveo/headless';

class DateFacet extends Component {

  constructor(props) {
    super(props);
    const options = {
      field: props.field,
      facetId: props.facetId,
      generateAutomaticRanges: props.generateAutomaticRanges,
      currentValues: props.currentValues.map((value) => buildDateRange(value))
    };
    this.title = props.title;
    this.facetId = props.facetId;
    this.headlessDateFacet = buildDateFacet(engine, { options });
    this.state = this.headlessDateFacet.state;
  }

  componentDidMount() {
    this.headlessDateFacet.subscribe(() => {
      this.setState(this.headlessDateFacet.state);
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
          checked={this.headlessDateFacet.isValueSelected(value)}
          onChange={() => this.headlessDateFacet.toggleSelect(value)}
        />
        <label
          className="form-check-label small"
          htmlFor={this.facetId + i}
        >
          {value.start.split("/")[0]} - {value.end.split("/")[0]}
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

export default DateFacet;