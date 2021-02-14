import { Component } from 'react';
import { engine } from "../engine";
import { buildQuerySummary } from '@coveo/headless';

class QuerySummary extends Component {

  constructor() {
    super();
    this.headlessQuerySummary = buildQuerySummary(engine);
    this.state = this.headlessQuerySummary.state;
  }

  componentDidMount() {
    this.headlessQuerySummary.subscribe(() => {
      this.setState(this.headlessQuerySummary.state);
    })
  }

  render() {
    const { firstResult, lastResult, query, durationInSeconds, total,
      hasQuery } = this.state;
    let summary;

    if (total === 0) {
      summary = (
        <span>
          <span className="font-weight-bold">0</span>{" results "}
        </span>
      )
    } else {
      summary = (
        <span>
          Results
          <span className="font-weight-bold"> {firstResult}-{lastResult} </span>
          of
          <span className="font-weight-bold"> {total} </span>
        </span>
      )
    }

    return (
      <span className="small"> {summary}
        {hasQuery && "for"}
        <span className="font-weight-bold"> {query} </span>
          in {durationInSeconds} seconds
      </span>)


  }
}

export default QuerySummary;