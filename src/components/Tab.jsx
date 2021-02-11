import { Component } from 'react';
import { engine } from "../engine";
import { buildTab } from "@coveo/headless";
import "../styles/Tab.css";

class Tab extends Component {

  constructor(props) {
    super(props);

    const initTab = {
      options: { expression: props.tabExpression },
      initialState: { isActive: props.defaultTab }
    };
    this.headlessTab = buildTab(engine, initTab);
    this.state = this.headlessTab.state;
  }

  componentDidMount() {
    this.headlessTab.subscribe(() => {
      this.setState(this.headlessTab.state);
    });
  }

  setActive() {
    this.headlessTab.select();
  }

  render() {
    const classes = "btn nav-item nav-link m-2 ";
    return (
      <button
        className={this.state.isActive ? classes + "active" : classes}
        onClick={this.setActive.bind(this)}
      >
        {this.props.label}
      </button>
    );
  }
}

export default Tab;