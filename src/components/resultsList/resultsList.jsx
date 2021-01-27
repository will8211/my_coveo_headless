import "./resultsList.css";
import { engine } from "../../engine";
import { Component } from 'react';
import {
  buildResultList,
  ResultAnalyticsActions,
  ResultTemplatesHelpers,
  buildResultTemplatesManager
} from "@coveo/headless";

class ResultsList extends Component {

  constructor(props) {
    super(props);
    const options = { fieldsToInclude: ["@date", "filetype", "author"] };
    this.headlessResultList = buildResultList(engine, { options });
    this.state = this.headlessResultList.state;

    this.headlessResultListManager = buildResultTemplatesManager(engine);

    this.headlessResultListManager.registerTemplates({
      conditions: [],
      priority: 1,
      content: (result) => (
        <div className="card mt-3" key={Math.random().toString()}>
          <ul className="list-group list-group-flush">
          <li className="list-group-item active"
              onClick={() => {
                engine.dispatch(ResultAnalyticsActions.logDocumentOpen(result));
                window.open(`${result.ClickUri}`, "_blank");
              }}
            >
              {result.title} _ Date: {result.raw.date}
            </li>
            <li className="list-group-item">
              {result.excerpt}
            </li>
          </ul>
        </div>
      )
    });
    this.headlessResultListManager.registerTemplates({
      conditions: [ResultTemplatesHelpers.fieldMustMatch("filetype", ["pdf"])],
      priority: 2,
      content: (result) => (
        <div className="card mt-3" key={Math.random().toString()}>
          <ul className="list-group list-group-flush active">
            <li className="list-group-item active"
              onClick={() => window.open(`${result.ClickUri}`, "_blank")}
            >
              {result.title} 
            </li>
            <li className="list-group-item">
              pdf template goes here
            </li>
          </ul>
        </div>
      )
    });

  }

  componentDidMount() {
    this.headlessResultList.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessResultList.state);
  }

  results() {
    return (
      <div>
        {this.state.results.map((result) => {
          console.log(result);
          const template = this.headlessResultListManager.selectTemplate(
            result
          );
          return template ? template(result) : null;
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.results()}
      </div>
    );
  }
}

export default ResultsList;