import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const gqlEndpoint = process.env.REACT_APP_GQL_ENDPOINT;

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
        uri: gqlEndpoint
    }),
});

export default client;