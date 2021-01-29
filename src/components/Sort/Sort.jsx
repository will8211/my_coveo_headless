import { Component, Fragment } from 'react';
import { engine } from "../../engine";
import {
  buildSort,
  buildDateSortCriterion,
  buildRelevanceSortCriterion,
  buildFieldSortCriterion,
  SortOrder,
} from '@coveo/headless';
import './Sort.css'

class Sort extends Component {

  constructor(props) {
    super(props);
    const initialState = { criterion: buildRelevanceSortCriterion() };
    this.headlessSort = buildSort(engine, { initialState });
    this.state = this.headlessSort.state;
    this.state.dateReversed = false;
    this.state.sizeReversed = false;
  }

  componentDidMount() {
    this.headlessSort.subscribe(() => {
      this.setState(this.headlessSort.state);
    });
  }

  sortByDateDescending = () => {
    const criteria = buildDateSortCriterion(SortOrder.Descending)
    this.headlessSort.sortBy(criteria);
    this.setState({ dateReversed: false });
  }

  sortByDateAscending = () => {
    const criteria = buildDateSortCriterion(SortOrder.Ascending);
    this.headlessSort.sortBy(criteria);
    this.setState({ dateReversed: true });
  }

  sortBySizeDescending = () => {
    const criteria = buildFieldSortCriterion("size", SortOrder.Descending);
    this.headlessSort.sortBy(criteria);
    this.setState({ sizeReversed: false });
  }

  sortBySizeAscending = () => {
    const criteria = buildFieldSortCriterion("size", SortOrder.Ascending);
    this.headlessSort.sortBy(criteria);
    this.setState({ sizeReversed: true });
  }

  sortByRelevance = () => {
    const criteria = buildRelevanceSortCriterion();
    this.headlessSort.sortBy(criteria);
  }

  render() {
    const criteria = this.state.sortCriteria;
    const classes = "btn btn-sm ml-2 btn-sort float-right btn-";
    return (
      <Fragment>
        <button
          className={`${classes}${criteria === 'relevancy'
            ? 'primary' : 'secondary'}`}
          onClick={this.sortByRelevance}
        >Relevance</button>

        <button
          className={`${classes}${criteria.startsWith('date')
            ? 'primary' : 'secondary'}`}
          onClick={this.sortByDateAscending}
          hidden={this.state.dateReversed}
        >Date ↓</button>

        <button
          className={`${classes}${criteria.startsWith('date')
            ? 'primary' : 'secondary'}`}
          onClick={this.sortByDateDescending}
          hidden={!this.state.dateReversed}
        >Date ↑</button>

        <button
          className={`${classes}${criteria.startsWith('@size')
            ? 'primary' : 'secondary'}`}
          onClick={this.sortBySizeAscending}
          hidden={this.state.sizeReversed}
        >Size ↓</button>

        <button
          className={`${classes}${criteria.startsWith('@size')
            ? 'primary' : 'secondary'}`}
          onClick={this.sortBySizeDescending}
          hidden={!this.state.sizeReversed}
        >Size ↑</button>
      </Fragment>
    )
  }
}

export default Sort;