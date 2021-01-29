import { Component } from 'react';
import { engine } from "../../engine";
import { buildQueryError } from '@coveo/headless';
import './QueryError.css'

class QueryError extends Component {

  constructor(props) {
    super(props);
    const options = {};
    this.headlessQueryError = buildQueryError(engine, { options });
    this.state = this.headlessQueryError.state;
  }

  componentDidMount() {
    this.headlessQueryError.subscribe(() => {
      this.setState(this.headlessQueryError.state);
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
          <p>Query error: {this.state.error.message} (error code {this.state.error.statusCode})</p>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default QueryError;