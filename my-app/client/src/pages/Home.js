import React from 'react';
import { useQuery } from '@apollo/client';

import {Message} from './Message';
import {NewMessage} from './NewMessage';

import { QUERY_MESSAGES } from '../utils/queries';

export function Home (){
  const { loading, data } = useQuery(QUERY_MESSAGES);
  const messages = data?.messages || [];

  return (
    <main>
      <div className="flex-row">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <NewMessage />
        </div>
        <div className="col-12 col-md-3 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Message
              messages={messages}
              title="All Messages"
            />
          )}
        </div>
      </div>
    </main>
  );
};
