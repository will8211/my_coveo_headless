import { buildQuerySummary } from '@coveo/headless';
import React, { Component } from 'react';
import './QuerySummary.css'
import { engine } from "../../engine";

class QuerySummary extends Component {

  constructor(props) {
    super(props);
    this.headlessQuerySummary = buildQuerySummary(engine);
    this.state = this.headlessQuerySummary.state;
  }

  componentDidMount() {
    this.headlessQuerySummary.subscribe(() => this.setState(this.headlessQuerySummary.state))
  }

  render() {
    const { firstResult, lastResult, total, query, durationInSeconds, hasResults } = this.state;
    if (hasResults) {
      return (
            <p className="small summary-p">{total} results for "{query}". Showing results {firstResult} to {lastResult}. Search took {durationInSeconds} seconds. {hasResults}</p>
      )
    } else {
      return null;
    }
  }
}

export default QuerySummary;