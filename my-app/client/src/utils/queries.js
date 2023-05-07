import { gql } from '@apollo/client';

export const QUERY_MESSAGES = gql`
  query getMessages {
    messages {
        description
        }
    }
  }
`;
