import { Component } from 'react';
import { engine } from "../../engine";
import { buildPager } from '@coveo/headless';
import './Pager.css'


class Pager extends Component {

  constructor(props) {
    super(props);
    const options = { numberOfPages: 4 }
    this.headlessPager = buildPager(engine, { options });
    this.state = this.headlessPager.state;
  }

  componentDidMount() {
    this.headlessPager.subscribe(() => this.setState(this.headlessPager.state));
  }

  renderButtons() {
    const { currentPage, currentPages } = this.state;
    return currentPages.map((p) => (
      <button
        key={"page" + p}
        className={"btn btn-sm m-1 " + (p === currentPage ? "btn-primary" : "btn-secondary")}
        onClick={() => { this.headlessPager.selectPage(p) }}
      >{p}</button>
    ))
  }

  render() {
    const { currentPage, currentPages, maxPage } = this.state;

    return (
      <div>
        {currentPage !== 1 && <button
          className="btn btn-sm btn-secondary m-1"
          onClick={() => { this.headlessPager.selectPage(1) }}
        >{"⇤"}</button>}

        {this.renderButtons()}

        {currentPage !== maxPage && currentPages.length > 0 && <button
          className="btn btn-sm btn-secondary m-1"
          onClick={() => { this.headlessPager.selectPage(maxPage) }}
        >{"⇥"}</button>}
      </div>
    )
  }
}

export default Pager;