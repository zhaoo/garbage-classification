import { gql } from 'apollo-boost'

export const category = gql`
  query {
    category {
      name
      id
      image
    }
  }
`

export const garbage = gql`
  query Garbage ($current: Float!, $limit: Float!) {
    garbage (current: $current, limit: $limit) {
      list {
        name
        id
        categoryId
      }
      total
    }
  }
`

export const deleteGarbage = gql`
  mutation DeleteGarbage ($id: String!) {
    deleteGarbage(id: $id) {
      name
    }
  }
`