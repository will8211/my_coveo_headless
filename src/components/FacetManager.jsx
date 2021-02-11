import { Component } from 'react';
import { engine } from "../engine";
import { buildFacetManager } from "@coveo/headless";

class FacetManager extends Component {
  constructor(props) {
    super(props);
    this.headlessFacetManager = buildFacetManager(engine);
    this.state = this.headlessFacetManager.state;
  }

  componentDidMount() {
    this.headlessFacetManager.subscribe(() => {
      this.setState(this.headlessFacetManager.state)
    });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default FacetManager;