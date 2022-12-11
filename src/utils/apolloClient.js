import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const URI = 'http://192.168.50.225:4000/graphql'

const httpLink = createHttpLink({
    uri: URI,
});

const createApolloClient = () => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;