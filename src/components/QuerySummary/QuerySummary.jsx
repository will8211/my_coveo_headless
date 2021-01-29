import { Component } from 'react';
import { buildQuerySummary } from '@coveo/headless';
import { engine } from "../../engine";
import './QuerySummary.css'

class QuerySummary extends Component {

  constructor(props) {
    super(props);
    this.headlessQuerySummary = buildQuerySummary(engine);
    this.state = this.headlessQuerySummary.state;
  }

  componentDidMount() {
    this.headlessQuerySummary.subscribe(() => {
      this.setState(this.headlessQuerySummary.state);
    })
  }

  render() {
    const { firstResult, lastResult, query, durationInSeconds, total, hasResults,
      hasQuery } = this.state;

    if (hasResults) {
      return (
        <p className="small summary-p">
          Results
          <span className="font-weight-bold"> {firstResult}-{lastResult} </span>
          of
          <span className="font-weight-bold"> {total} </span>
          {hasQuery && "for"}
          <span className="font-weight-bold"> {query} </span>
          in {durationInSeconds} seconds
        </p>
      )
    } else {
      return null;
    }
  }
}

export default QuerySummary;