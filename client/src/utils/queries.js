import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;