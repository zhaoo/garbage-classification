import { gql } from 'apollo-boost'

export const category = gql`
  query {
    category {
      name
      id
    }
  }
`

export const garbageByCategoryId = gql`
  query GarbageByCategoryId($categoryId: String!) {
    garbageByCategoryId (categoryId: $categoryId) {
      name
    }
  }
`