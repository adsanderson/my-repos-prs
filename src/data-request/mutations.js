export async function getPrs(ctx) {
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

// mutation {
//     closePullRequest(input: {pullRequestId: "MDExOlB1bGxSZXF1ZXN0OTMzOTg0NTE="} ) {
//       pullRequest {
//         id
//         title
//        state
//       }
//     }
//   }
