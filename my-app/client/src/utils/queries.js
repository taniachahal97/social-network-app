import { gql } from '@apollo/client';

export const QUERY_MESSAGES = gql`
    query getMessages {
        messages {
            description
        }
    }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      messages {
        _id
        description
      }
    }
  }
`;


