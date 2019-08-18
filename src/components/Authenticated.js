import React from "react";
import { useService } from "@xstate/react";

export function Authenticated({ prRef }) {
  const [prState] = useService(prRef);
  return (
    <React.Fragment>
      <h3>{prState.value}</h3>
      {prState.value === "initialize" ? <h2>Loading</h2> : null}
      {prState.value === "showPrs" ? (
        <ul>
          {prState.context.prs.map(repo => (
            <li>
              <h4>{repo.name}</h4>
              <ul>
                {repo.pullRequests.nodes &&
                  repo.pullRequests.nodes.map(pr => (
                    <li>
                      <a href={pr.url}>{pr.title}</a>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </React.Fragment>
  );
}
