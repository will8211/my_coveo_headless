import { Component, Fragment } from 'react';
import { engine } from "../../engine";
import { buildResultList, buildResultTemplatesManager } from "@coveo/headless";
import { templates } from "./templates";
import "./ResultsList.css";

class ResultsList extends Component {

  constructor(props) {
    super(props);
    const options = { fieldsToInclude: ["@date", "filetype", "author"] };
    this.headlessResultList = buildResultList(engine, { options });
    this.state = this.headlessResultList.state;
    this.headlessResultListManager = buildResultTemplatesManager(engine);
    templates.map((template) => this.headlessResultListManager.registerTemplates(template));
  }

  componentDidMount() {
    this.headlessResultList.subscribe(() => this.setState(this.headlessResultList.state));
  }

  render() {
    return (
      <Fragment>
        {this.state.results.map((result) => {
          const template = this.headlessResultListManager.selectTemplate(result);
          return template ? template(result) : null;
        })}
      </Fragment>
    );
  }
}

export default ResultsList;