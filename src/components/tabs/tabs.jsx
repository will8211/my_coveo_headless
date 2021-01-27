import "./tabs.css";
import { engine } from "../../engine";
import { Component } from 'react';
import { buildTab } from "@coveo/headless";

class Tab extends Component {

  tabExpression;
  label;
  defaultTab;

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
    this.headlessTab.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessTab.state);
  }

  handleChange(event) {
    this.headlessTab.select();
  }

  render() {
    return (
      <Tab
        value={this.props.label}
        label={this.props.label}
        className={this.state.isActive ? "activeTab" : ""}
        onFocus={(e) => {
          this.handleChange(e);
        }}
      />
    );
  }
}

class Tabs extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <Tab tabExpression="" label="All Content" defaultTab={true} />
        <Tab tabExpression="@filetype==youtubevideo" label="Youtube" />
        <Tab tabExpression="@sfid" label="Salesforce" />
      </nav>
    );
  }
}

export default Tabs;