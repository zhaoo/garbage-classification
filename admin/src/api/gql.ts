import { gql } from 'apollo-boost'

export const category = gql`
  query {
    category {
      name
      id
      image
      description
      tips
    }
  }
`

export const garbage = gql`
  query Garbage ($current: Float!, $limit: Float!, $keyword: String, $categoryId: String) {
    garbage (current: $current, limit: $limit, keyword: $keyword, categoryId: $categoryId) {
      list {
        name
        id
        categoryId
        description
        updateTime
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

export const createGarbage = gql`
  mutation CreateGarbage ($name: String!, $categoryId: String!, $description: String) {
    createGarbage(input: {name: $name, categoryId: $categoryId, description: $description}) {
      name
    }
  }
`

export const updateGarbage = gql`
  mutation UpdateGarbage ($id: String!, $name: String!, $categoryId: String!, $description: String) {
    updateGarbage(id: $id, input: {name: $name, categoryId: $categoryId, description: $description}) {
      name
    }
  }
`

export const createCategory = gql`
  mutation CreateCategory ($name: String!, $image: String, $description: String, $tips: [String!]) {
    createCategory(input: {name: $name, image: $image, description: $description, tips: $tips}) {
      name
    }
  }
`

export const updateCategory = gql`
  mutation UpdateCategory ($id: String!, $name: String!, $image: String, $description: String, $tips: [String!]) {
    updateCategory(id: $id, input: {name: $name, image: $image, description: $description, tips: $tips}) {
      name
    }
  }
`