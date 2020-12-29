import {ApolloProvider,ApolloClient,InMemoryCache,createHttpLink} from '@apollo/client';
import React from 'react';
import App from './App';
import {setContext} from 'apollo-link-context';

const authLink=setContext(()=>{
    let token=localStorage.getItem('jwtToken');
    return {
        headers:{
            Authorization:(token)?`Bearer ${token}`:``
        }
    }
});

const link=createHttpLink({
    uri:'https://merng-social-network-server.herokuapp.com/'
})

const client=new ApolloClient({
    cache:new InMemoryCache(),
    link:authLink.concat(link),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
      }
});
export default(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>  
);
