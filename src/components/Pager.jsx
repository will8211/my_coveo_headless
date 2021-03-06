import { Component } from "react";
import { engine } from "../engine";
import { buildPager } from "@coveo/headless";
import "../styles/Pager.css";

class Pager extends Component {
  constructor(props) {
    super(props);
    const options = { numberOfPages: 4 };
    const initialState = { page: 1 };
    this.headlessPager = buildPager(engine, { options, initialState });
    this.state = this.headlessPager.state;
    this.state.currentMaxpage = this.state.maxPage;
  }

  componentDidMount() {
    this.headlessPager.subscribe(() => {
      this.setState(this.headlessPager.state);
    });
  }

  // // This resets the pager to page one when a new search occurs. Hack: won't
  // // work if the result happens to be the same number of pages. Also resets to 
  // // page 1 on ResultsPerPage changes. 
  // componentDidUpdate() {
  //   if (this.state.currentMaxpage !== this.state.maxPage) {
  //     this.headlessPager.selectPage(1);
  //     this.setState({ currentMaxpage: this.state.maxPage });
  //   }
  // }

  renderButtons() {
    const { currentPage, currentPages } = this.state;
    return currentPages.map((p) => (
      <button
        key={"page" + p}
        className={
          "btn btn-sm btn-round m-1 " +
          (p === currentPage ? "btn-primary" : "btn-secondary")
        }
        onClick={() => {
          this.headlessPager.selectPage(p);
        }}
      >
        {p}
      </button>
    ));
  }

  render() {
    const { currentPage, currentPages, maxPage } = this.state;

    return (
      <div>
        {currentPage !== 1 && (
          <button
            className="btn btn-sm btn-round m-1 btn-secondary"
            onClick={() => {
              this.headlessPager.selectPage(1);
            }}
          >
            {"⇤"}
          </button>
        )}

        {this.renderButtons()}

        {currentPage !== maxPage && currentPages.length > 0 && (
          <button
            className="btn btn-sm btn-round m-1 btn-secondary"
            onClick={() => {
              this.headlessPager.selectPage(maxPage);
            }}
          >
            {"⇥"}
          </button>
        )}
      </div>
    );
  }
}

export default Pager;
