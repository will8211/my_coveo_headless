import { ResultAnalyticsActions, ResultTemplatesHelpers } from "@coveo/headless";
import { engine } from "../../engine";

export const templates = [
  {
    conditions: [],
    priority: 1,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item active font-weight-bold"
            onClick={() => {
              engine.dispatch(ResultAnalyticsActions.logDocumentOpen(result));
              window.open(`${result.ClickUri}`, "_blank");
            }}
          >
            {result.title}
          </li>
          <li className="list-group-item">
            <p>Excerpt: {result.excerpt}</p>
            <p>Date: {dateFromTimestamp(result.raw.date)}</p>
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
          <li className="list-group-item active font-weight-bold"
            onClick={() => window.open(`${result.ClickUri}`, "_blank")}
          >
            {result.title}
          </li>
          <li className="list-group-item">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img src={process.env.PUBLIC_URL + '/icons/pdf.svg'} width="64" />
                </div>
                <div className="col-10">
                  <p>{result.excerpt}</p>
                </div>
              </div>
            </div>
            <p>{dateFromTimestamp(result.raw.date)}</p>
          </li>
        </ul>
      </div >
    )
  }]

function dateFromTimestamp(timestampStr) {
  let timestamp = parseInt(timestampStr)
  let date = new Date(timestamp);
  let formattedTime = date.toLocaleString();

  return (formattedTime);
}