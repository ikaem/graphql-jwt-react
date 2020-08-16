import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
  ApolloCache,
  gql,
  NormalizedCacheObject,
} from "@apollo/client";
// import { setContext } from "@apollo/link-context";
import { setContext } from "@apollo/client/link/context";

const gqlEndpoint = process.env.REACT_APP_GQL_ENDPOINT;

const authLink = setContext((_, { headers }) => {
  const {
    login: { access_token },
  } = client.readQuery({
    query: gql`
      query Login {
        login {
          access_token
        }
      }
    `,
  }) as {
    login: {
      access_token: string;
    };
  };

  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: gqlEndpoint,
  credentials: "include",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers: {},
});

// console.log(client.cache)

client.writeQuery({
  query: gql`
    query Login {
      login {
        __typename
        first_name
        avatar_link
        access_token
        isLoggedIn
        refreshRequestHasFinished
      }
    }
  `,
  data: {
    login: {
      __typename: "",
      first_name: "",
      avatar_link: "",
      access_token: "",
      isLoggedIn: false,
      refreshRequestHasFinished: false,
    },
  },
});


client.onResetStore( async() => {
  client.writeQuery({
    query: gql`
      query Login {
        login {
          __typename
          first_name
          avatar_link
          access_token
          isLoggedIn
          refreshRequestHasFinished
        }
      }
    `,
    data: {
      login: {
        __typename: "",
        first_name: "",
        avatar_link: "",
        access_token: "",
        isLoggedIn: false,
        refreshRequestHasFinished: true,
      },
    },
  });
});

export default client;
