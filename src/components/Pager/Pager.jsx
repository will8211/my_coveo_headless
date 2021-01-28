import { buildPager } from '@coveo/headless';
import React, { Component } from 'react';
import './Pager.css'
import { engine } from "../../engine";

class Pager extends Component {

  constructor(props) {
    super(props);
    const options = { numberOfPages: 3 };
    this.headlessPager = buildPager(engine, options);
    this.state = this.headlessPager.state;
  }

  componentDidMount() {
    this.headlessPager.subscribe(() => this.setState(this.headlessPager.state))
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">Pager</h5>
        </div>
      </div>
    )
  }
}

export default Pager;