import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessage($messageID:ID!)
  {
    deleteMessage(_id: $messageID)
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation updateMessage($messageId: ID!, $description: String!) {
  updateMessage(_id: $messageId, description: $description) {
    _id
    description
  }
}
 `;

 export const ADD_MESSAGE = gql`
  mutation addMessage($description: String!) {
    addMessage(description: $description) {
      _id
      description
    }
  }
`;


