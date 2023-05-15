import { gql } from '@apollo/client';

export const QUERY_MESSAGES = gql`
    query getMessages {
        messages {
            _id
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

//export const MESSAGE_SUBSCRIPTION = gql`
  //subscription {
    //messageAdded {
      //_id
      //description
      //user {
        //_id
        //username
      //}
    //}
  //}
//`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription messageAdded($description: String!) {
    messageAdded(description: $description) {
      _id
      description
      user {
        _id
        username
      }
    }
  }
`;


