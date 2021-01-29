import { Component } from 'react';
import { engine } from "../../engine";
import { buildResultsPerPage } from '@coveo/headless';
import './ResultsPerPage.css'

class ResultsPerPage extends Component {

  constructor(props) {
    super(props);
    const initialState = { numberOfResults: 5 };
    this.choices = [5, 10, 25];
    this.headlessResultsPerPage = buildResultsPerPage(engine, { initialState });
    this.state = this.headlessResultsPerPage.state;
  }

  componentDidMount() {
    this.headlessResultsPerPage.subscribe(() => {
      this.setState(this.headlessResultsPerPage.state);
    });
  }

  renderButtons() {
    const classes = "btn btn-sm m-1 btn-square ";
    return this.choices.map((choice) => (
      <button
        key={"setTo" + choice}
        className={this.headlessResultsPerPage.isSetTo(choice)
          ? classes + "btn-primary"
          : classes + "btn-secondary"}
        onClick={() => {
          !this.headlessResultsPerPage.isSetTo(choice)
            && this.headlessResultsPerPage.set(choice)
        }}
      >{choice}</button>
    ))
  }

  render() {
    return (
      <div>
        <span>Results per page:</span>{this.renderButtons()}
      </div>
    )
  }
}

export default ResultsPerPage;