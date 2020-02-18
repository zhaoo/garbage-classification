import React, { Component } from 'react'
import Router from './Router'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import './App.scss'

const client = new ApolloClient({
  uri: 'https://mac.izhaoo.com:7043/graphql'
})

export default class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </div>
    )
  }
}