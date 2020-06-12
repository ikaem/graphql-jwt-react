import React from "react";
import { ApolloProvider } from "@apollo/client";

import client from "./apollo-client";

const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
    <ApolloProvider client={client}>
        { children }
    </ApolloProvider>
    );
}

export default ApolloClientProvider;