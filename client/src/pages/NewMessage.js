import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MESSAGE, UPDATE_MESSAGE } from '../utils/mutations';
import { Link } from 'react-router-dom';
import { QUERY_MESSAGES } from '../utils/queries';

import Auth from '../utils/auth';

export function NewMessage() {
  const { loading, data } = useQuery(QUERY_MESSAGES);
  const messages = data?.messages || [];
  const [createMessage] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { createMessage } }) {
      cache.modify({
        fields: {
          messages(existingMessages = []) {
            const newMessageRef = cache.writeFragment({
              data: createMessage
            });
            return [...existingMessages, newMessageRef];
          }
        }
      });
    }
  });
  const [updateMessage] = useMutation(UPDATE_MESSAGE, {
    update(cache, { data: { updateMessage } }) {
      cache.modify({
        fields: {
          messages(existingMessages = []) {
            const updatedMessageRef = cache.writeFragment({
              data: updateMessage
            });
            return existingMessages.map(message =>
              message.id === updateMessage.id ? updatedMessageRef : message
            );
          }
        }
      });
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [editMessage, setEditMessage] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;
    try {
      await createMessage({
        variables: { description: inputValue },
      });
      setInputValue('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    if (editMessage.description.trim() === '') return;
    try {
      console.log(editMessage);
      await updateMessage({
        variables: { messageId: editMessage._id, description: editMessage.description },
      });
      setEditMessage(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditChange = (event) => {
    setEditMessage({ ...editMessage, description: event.target.value });
  };

  const handleCancelEdit = () => {
    setEditMessage(null);
  };

  const handleEditClick = (message) => {
    setEditMessage(message);
    setInputValue(message.description);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {Auth.loggedIn() ? (
        <form onSubmit={editMessage ? handleEditFormSubmit : handleFormSubmit}>
          <input type="text" value={editMessage? editMessage.description: inputValue} onChange={editMessage ? handleEditChange : handleInputChange} />
          <button type="submit">{editMessage ? 'Save' : 'Add'}</button>
          {editMessage && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
        </form>
      ) : (
        <p>You must be logged in to add or edit messages.</p>
      )}
      {error && <p>{error.message}</p>}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.description}{' '}
            {Auth.loggedIn() && (
              <button type="button" onClick={() => handleEditClick(message)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>

  );
}



