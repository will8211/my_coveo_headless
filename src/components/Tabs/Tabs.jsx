import "./Tabs.css";
import { engine } from "../../engine";
import { Component } from 'react';
import { buildTab } from "@coveo/headless";

class Tabs extends Component {

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

  render() {
    return (
      <nav class="navbar navbar-expand-sm navbar-dark">
        <a class="navbar-brand" href="#">
          <img class="js-o-header__logo o-header__logo" src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoiY292ZW9cL2FjY291bnRzXC8xM1wvNDAwMDI0NVwvcHJvamVjdHNcLzE0XC9hc3NldHNcLzRkXC8xNTA3XC83ZWYwYzNiNWRlMTNlNmU2MmQxZTFmZDY0YmU5YTljNi0xNjA4MTYyNzI4LnBuZyJ9:coveo:EXBbRJeSAFgtqJLa9dHSiTUROMitJYTLDrBi0xNEnH8?width=100" alt="Coveo Brand Playbook" />
        </a>
        <div class="navbar-nav">
          <button class="btn nav-item nav-link active" href="#">ALL CONTENT</button>
          <button class="btn nav-item nav-link" href="#">YOUTUBE</button>
          <button class="btn nav-item nav-link" href="#">SALESFORCE</button>
        </div>
      </nav>
    );
  }
}

export default Tabs;