import "./Tabs.css";
import { engine } from "../../engine";
import { Component } from 'react';
import { buildTab } from "@coveo/headless";

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
    this.headlessTab.subscribe(() => this.setState(this.headlessTab.state));
  }

  setActive() {
    this.headlessTab.select();
  }

  render() {
    const classes = "btn nav-item nav-link ";
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

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark">
        <img className="navbar-brand" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoiY292ZW9cL2FjY291bnRzXC8xM1wvNDAwMDI0NVwvcHJvamVjdHNcLzE0XC9hc3NldHNcLzRkXC8xNTA3XC83ZWYwYzNiNWRlMTNlNmU2MmQxZTFmZDY0YmU5YTljNi0xNjA4MTYyNzI4LnBuZyJ9:coveo:EXBbRJeSAFgtqJLa9dHSiTUROMitJYTLDrBi0xNEnH8?width=100" alt="Coveo Brand Playbook" />
        <div className="navbar-nav">
          <Tab tabExpression="" label="ALL CONTENT" />
          <Tab tabExpression="@filetype==youtubevideo" label="YOUTUBE" />
          <Tab tabExpression="@sfid" label="SALESFORCE" />
          <Tab tabExpression="@filetype==pdf" label="PDF DOCS" />
        </div>
      </nav>
    );
  }
}