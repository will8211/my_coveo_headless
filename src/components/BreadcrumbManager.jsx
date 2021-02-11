import { Component, Fragment } from 'react';
import { engine } from "../engine";
import { buildBreadcrumbManager } from '@coveo/headless';

class BreadcrumbManager extends Component {

  constructor(props) {
    super(props);
    const options = {};
    this.headlessBreadcrumbManager = buildBreadcrumbManager(engine, { options });
    this.state = this.headlessBreadcrumbManager.state;
    this.badgeClasses = "btn badge badge-secondary m-1";
  }

  componentDidMount() {
    this.headlessBreadcrumbManager.subscribe(() => {
      this.setState(this.headlessBreadcrumbManager.state);
    });
  }

  renderFacetBreadcrumbs() {
    return (
      <Fragment>
        {this.state.facetBreadcrumbs.map((field, i) => (
          <Fragment key={i}>
            <span>{field.field}:</span>
            {field.values.map((item, i) => (
              <button
                key={i}
                className={this.badgeClasses}
                onClick={() => {
                  item.deselect();
                }}
              >
                {item.value.value}&nbsp;&nbsp;
                <span>✕</span>
              </button>
            ))}
          </Fragment>
        ))}
      </Fragment>
    )
  }

  renderDateFacetBreadcrumbs() {
    return (
      <Fragment>
        {this.state.dateFacetBreadcrumbs.map((field, i) => (
          <Fragment key={i}>
            <span>{field.field}:</span>
            {field.values.map((item, i) => (
              <button
                key={i}
                className={this.badgeClasses}
                onClick={() => {
                  item.deselect();
                }}
              >
                {item.value.start.split("/")[0]}-
                {item.value.end.split("/")[0]}&nbsp;&nbsp;✕
              </button>
            ))}
          </Fragment>
        ))}
      </Fragment>
    )
  }

  renderNumericFacetBreadcrumb() {
    return (
      <Fragment>
        {this.state.numericFacetBreadcrumbs.map((field, i) => (
          <Fragment key={i}>
            <span>{field.field}:</span>
            {field.values.map((item, i) => (
              <button
                key={i}
                className={this.badgeClasses}
                onClick={() => {
                  item.deselect();
                }}
              >
                {item.value.start}-{item.value.end}&nbsp;&nbsp;✕
              </button>
            ))}
          </Fragment>
        ))}
      </Fragment>
    )
  }

  renderCategoryFacetBreadcrumbs() {
    return (
      <Fragment>
        {this.state.categoryFacetBreadcrumbs.map((field, i) => (
          <Fragment key={i}>
            <span>{field.field}:</span>
            {field.path.map((item, i) => (
              <button
                key={i}
                className={this.badgeClasses}
                onClick={() => {
                  field.deselect();
                }}
              >
                {item.value}&nbsp;&nbsp;✕
              </button>
            ))}
          </Fragment>
        ))}
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        {this.renderFacetBreadcrumbs()}
        {this.renderDateFacetBreadcrumbs()}
        {this.renderNumericFacetBreadcrumb()}
        {this.renderCategoryFacetBreadcrumbs()}
      </div>
    )
  }
}

export default BreadcrumbManager;