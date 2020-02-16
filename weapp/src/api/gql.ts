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

export const categoryById = gql`
  query CategoryById ($id: String!) {
    categoryById (id: $id) {
      name
      type
      image
      description
      tips
    }
  }
`

export const garbageByCategoryId = gql`
  query GarbageByCategoryId ($categoryId: String!) {
    garbageByCategoryId (categoryId: $categoryId) {
      name
      categoryId
    }
  }
`

export const searchGarbage = gql`
  query SearchGarbage ($keyword: String!) {
    searchGarbage (keyword: $keyword) {
      name
      categoryId
      description
    }
  }
`

export const createGarbage = gql`
  mutation CreateGarbage ($name: String!, $categoryId: String!, $description: String!) {
    createGarbage(input: {name: $name, categoryId: $categoryId, description: $description}) {
      name
    }
  }
`
