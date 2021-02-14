import React, { Component } from 'react';
import { engine } from "../engine";
import { buildDidYouMean } from "@coveo/headless";

class DidYouMean extends Component {

  constructor(props) {
    super(props);
    this.headlessDidYouMean = buildDidYouMean(engine);
    this.state = this.headlessDidYouMean.state;
  }

  componentDidMount() {
    this.headlessDidYouMean.subscribe(() => {
      this.setState(this.headlessDidYouMean.state)
    });
  }

  render() {
    if (this.state.hasQueryCorrection) {
      return (
        <div>
          Text was corrected to: <b>{this.state.queryCorrection.correctedQuery}</b>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default DidYouMean