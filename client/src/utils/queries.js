import gql from 'graphql-tag';

export const QUERY_USER = gql`
  query user($_id: String) {
    user {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link       
        title
      }
    }
  }
`;