import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",

  // 인증 방법
  // - https://www.apollographql.com/docs/react/networking/authentication/
  // - request = 매 요청마다.
  request: async (operation: Operation) => {
    //다음 과정은 매 요청마다 confirmSecret을 통해 얻은 token을 header에 넣어주는 역할을 한다.
    operation.setContext({
      // #setContext
      // -https://www.apollographql.com/docs/link/overview/#gatsby-focus-wrapper
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt"))
      }
    },
    resolvers: {
      Mutation: {
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("jwt", token);
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true
              }
            }
          });
          return null;
        },
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          cache.writeData({
            data: {
              __typename: "Auth",
              isLoggedIn: false
            }
          });
          return null;
        }
      }
    }
  }
});

export default client;
