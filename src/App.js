import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer `
  }
});

function App() {
  return (
    <div className="App">
      <Test />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

function Test() {
  // const { loading, error, data } = useQuery(gql`
  //   query {
  //     viewer {
  //       repositories(first: 100) {
  //         nodes {
  //           name
  //         }
  //       }
  //     }
  //   }
  // `);

  useEffect(() => {
    async function x() {
      const result = await client.request(`
    query {
      viewer {
        repositories(first: 100) {
          nodes {
            name
          }
        }
      }
    }
  `);
      console.log(result);
    }
    x();
  });

  return <div>done</div>;
}
