import { ResultAnalyticsActions, ResultTemplatesHelpers } from "@coveo/headless";
import { engine } from "../engine";
import pdfIcon from './icons/pdf.png';
import youtubeIcon from './icons/youtube.png';
import salesforceIcon from './icons/salesforce.png';
import lithiumIcon from './icons/khoros.jpg';
import sharepointIcon from './icons/sharepoint.png';

export const templates = [
  {
    conditions: [],
    priority: 1,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <button className="list-group-item active font-weight-bold text-left"
            onClick={() => {
              engine.dispatch(ResultAnalyticsActions.logDocumentOpen(result));
              window.open(result.ClickUri, "_blank");
            }}
          >
            {result.title}
          </button>
          <li className="list-group-item">
            <p>Excerpt: {result.excerpt}</p>
            <span className="small">Date: {dateFromTimestamp(result.raw.date)}</span><br />
            <span className="small">Filetype: {result.raw.filetype}</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("filetype", ["pdf"])],
    priority: 2,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <button
            className="list-group-item active font-weight-bold text-left"
            onClick={() => window.open(result.ClickUri, "_blank")}
          >
            {result.title}
          </button>
          <li className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src={pdfIcon} className="img-fluid" width="64px" alt="pdf" />
                </div>
                <div className="col-10">
                  <p>{result.excerpt}</p>
                </div>
              </div>
            </div>
            <span className="small">Date: {dateFromTimestamp(result.raw.date)}</span><br />
            <span className="small">Filetype: {result.raw.filetype}</span>
          </li>
        </ul>
      </div >
    )
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("filetype", ["youtubevideo"])],
    priority: 2,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <button
            className="list-group-item active font-weight-bold text-left"
            onClick={() => window.open(result.ClickUri, "_blank")}
          >
            {result.title}
          </button>
          <li className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src={youtubeIcon} className="img-fluid" width="64px" alt="pdf" />
                </div>
                <div className="col-10">
                  <p>{result.excerpt}</p>
                </div>
              </div>
            </div>
            <span className="small">Date: {dateFromTimestamp(result.raw.date)}</span><br />
            <span className="small">Filetype: {result.raw.filetype}</span>
          </li>
        </ul>
      </div >
    )
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("filetype", ["SalesforceItem"])],
    priority: 3,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <button
            className="list-group-item active font-weight-bold text-left"
            onClick={() => window.open(result.ClickUri, "_blank")}
          >
            {result.title}
          </button>
          <li className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src={salesforceIcon} className="img-fluid" width="64px" alt="salesforce" />
                </div>
                <div className="col-10">
                  <p>{result.excerpt}</p>
                </div>
              </div>
            </div>
            <span className="small">Date: {dateFromTimestamp(result.raw.date)}</span><br />
            <span className="small">Filetype: {result.raw.filetype}</span>
          </li>
        </ul>
      </div >
    )
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("syssourcetype", ["Lithium"])],
    priority: 3,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <button
            className="list-group-item active font-weight-bold text-left"
            onClick={() => window.open(result.ClickUri, "_blank")}
          >
            {result.title}
          </button>
          <li className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src={lithiumIcon} className="img-fluid" width="64px" alt="khoros" />
                </div>
                <div className="col-10">
                  <p>{result.excerpt}</p>
                </div>
              </div>
            </div>
            <span className="small">Date: {dateFromTimestamp(result.raw.date)}</span><br />
            <span className="small">Filetype: {result.raw.filetype}</span>
          </li>
        </ul>
      </div >
    )
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("syssourcetype", ["Sharepoint"])],
    priority: 3,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <button
            className="list-group-item active font-weight-bold text-left"
            onClick={() => window.open(result.ClickUri, "_blank")}
          >
            {result.title}
          </button>
          <li className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src={sharepointIcon} className="img-fluid" width="64px" alt="sharepoint" />
                </div>
                <div className="col-10">
                  <p>{result.excerpt}</p>
                </div>
              </div>
            </div>
            <span className="small">Date: {dateFromTimestamp(result.raw.date)}</span><br />
            <span className="small">Filetype: {result.raw.filetype}</span>
          </li>
        </ul>
      </div >
    )
  }
]

let dateFromTimestamp = (timestampStr) => {
  let timestamp = parseInt(timestampStr)
  let date = new Date(timestamp);
  return date.toLocaleString();
}