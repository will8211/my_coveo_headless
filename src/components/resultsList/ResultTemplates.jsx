import { ResultAnalyticsActions, ResultTemplatesHelpers } from "@coveo/headless";
import { engine } from "../../engine";

export const templates = [
  {
    conditions: [],
    priority: 1,
    content: (result) => (
      <div className="card mt-3" key={Math.random().toString()}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item active text-primary"
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
  }]

function dateFromTimestamp(timestampStr) {
  let timestamp = parseInt(timestampStr)
  let date = new Date(timestamp);
  let formattedTime = date.toLocaleString();

  return (formattedTime);
}