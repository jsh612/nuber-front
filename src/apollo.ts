import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { toast } from "react-toastify";

const getToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    return token;
  } else {
    return "";
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      "X-JWT": getToken()
    }
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  // link는 아폴로가 데이터를 받는 방식
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      "X-JWT": getToken()
    },
    reconnect: true
  },
  uri: "ws://localhost:4000/subscription"
});

const combinedLinks = split(
  // 명령문이 subscrion인지 아닌지에 따라 WsLink 와 httpLink 중 하나를 선택한다.
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("jwt"))
    }
  },
  resolvers: {
    Mutation: {
      logUserIn: (_, { token }, { cache: appCache }) => {
        localStorage.setItem("jwt", token);
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
        return null;
      },
      logUserOut: (_, __, { cache: appCache }) => {
        localStorage.removeItem("jwt");
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        return null;
      }
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, combinedLinks)
  ])
});

export default client;

// apollo boost 적용시 (subsbsription 적용전)
// import ApolloClient, { Operation } from "apollo-boost";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   request: async (operation: Operation) => {
//     //다음 과정은 매 요청마다 confirmSecret을 통해 얻은 token을 header에 넣어주는 역할을 한다.
//     operation.setContext({
//       // #setContext
//       // -https://www.apollographql.com/docs/link/overview/#gatsby-focus-wrapper
//       headers: {
//         "X-JWT": localStorage.getItem("jwt") || ""
//       }
//     });
//   },
//   clientState: {
//     defaults: {
//       auth: {
//         __typename: "Auth",
//         isLoggedIn: Boolean(localStorage.getItem("jwt"))
//       }
//     },
//     resolvers: {
//       Mutation: {
//         logUserIn: (_, { token }, { cache }) => {
//           localStorage.setItem("jwt", token);
//           cache.writeData({
//             data: {
//               auth: {
//                 __typename: "Auth",
//                 isLoggedIn: true
//               }
//             }
//           });
//           return null;
//         },
//         logUserOut: (_, __, { cache }) => {
//           localStorage.removeItem("jwt");
//           cache.writeData({
//             data: {
//               auth: {
//                 __typename: "Auth",
//                 isLoggedIn: false
//               }
//             }
//           });
//           return null;
//         }
//       }
//     }
//   }
// });

// export default client;
