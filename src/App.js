import React from "react";
import "./App.css";
import { GraphQLClient } from "graphql-request";
import NetlifyAuthProvider from "netlify-auth-providers";
import { assign, spawn } from "xstate";
import { useMachine } from "@xstate/react";

import { authMachine } from "./state-machines/auth-machine";
import { prMachine } from "./state-machines/pr-machine";
import { Authenticated } from "./components/Authenticated";

const authMachineWithImplementation = authMachine.withConfig({
  services: {
    authenticate: auth
  },
  actions: {
    setToken: assign((_, evt) => {
      return {
        token: evt.data.token,
        prRef: spawn(
          prMachine
            .withConfig({
              services: {
                getPrs: getPrs
              },
              actions: {
                prsLoaded: assign((_, evt) => {
                  return {
                    prs: evt.data.viewer.repositories.nodes
                  };
                })
              }
            })
            .withContext({
              token: evt.data.token
            })
        )
      };
    })
  }
});

function auth() {
  const authenticator = new NetlifyAuthProvider({
    site_id: "romantic-kare-cb8440.netlify.com"
  });
  return new Promise((resolve, reject) => {
    authenticator.authenticate({ provider: "github", scope: "user" }, function(
      err,
      data
    ) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function getPrs(ctx) {
  const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      authorization: `Bearer ${ctx.token}`
    }
  });

  const result = await client.request(`
  query { 
    viewer { 
      repositories(first: 100) {
        nodes {
          name
          pullRequests(first: 100) {
            nodes {
              title
              url
            }
          }
        }
      }
    }
  }
  `);
  return result;
}

function App() {
  const [state, send] = useMachine(authMachineWithImplementation);
  return (
    <div className="App">
      <h2>
        {state.value} {state.context.token}
      </h2>
      <button onClick={() => send("SIGN_IN")}>Sign in</button>
      {state.value === "authenticated" ? (
        <Authenticated prRef={state.context.prRef} />
      ) : null}
    </div>
  );
}

export default App;
