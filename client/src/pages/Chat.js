import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ADD_MESSAGE } from "../utils/mutations";
import {  QUERY_MESSAGES , MESSAGE_SUBSCRIPTION } from "../utils/queries";

export function Chat(props) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { description } = useParams();

    const { loading, error, data } = useQuery(QUERY_MESSAGES, {
      variables: { description },
      
    });
    const [addMessage] = useMutation(ADD_MESSAGE, {
      update(cache, { data: { addMessage } }) {
        const existingMessages = cache.readQuery({
          query: QUERY_MESSAGES,
          variables: { description }
        });
        cache.writeQuery({
          query: QUERY_MESSAGES,
          variables: { description },
          data: {
            messages: [addMessage, ...existingMessages.messages]
          }
        });
      }
    });
  
    

    useEffect(() => {
      if (data && data.messages) {
        setMessages(data.messages);
      }
    }, [data]);
    
    const { data: subscriptionData } = useSubscription(MESSAGE_SUBSCRIPTION, {
      variables: { description },
      onSubscriptionData: ({ subscriptionData }) => {
        const { data: { messageAdded } } = subscriptionData;
        setMessages(prevMessages => [...prevMessages, messageAdded]);
        console.log(subscriptionData)
      }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      addMessage({
        variables: { input: { description: message} },
      });
      setMessage('');
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h2>Chat Room</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              
              {message.description} 
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
  
  