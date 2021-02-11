import { Component, Fragment } from 'react';
import { engine } from "../engine";
import { buildHistory } from '@coveo/headless';
import '../styles/History.css'

class History extends Component {

  constructor() {
    super();
    this.headlessHistory = buildHistory(engine);
    this.state = this.headlessHistory.state;
  }

  componentDidMount() {
    this.headlessHistory.subscribe(() => {
      this.setState(this.headlessHistory.state);
    });
  }

  render() {
    const classes = "btn btn-history m-1 btn-";
    return (
      <Fragment>
        <button
          className={`${classes}${this.state.past.length ? 'primary' : 'secondary'}`}
          onClick={this.headlessHistory.back}
          disabled={!this.state.past.length}
        >{'< Back'}</button>

        <button
          className={`${classes}${this.state.future.length ? 'primary' : 'secondary'}`}
          onClick={this.headlessHistory.forward}
          disabled={!this.state.future.length}
        >{'Forward >'}</button>
      </Fragment>
    )
  }
}

export default History;