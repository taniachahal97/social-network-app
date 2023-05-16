import React from 'react';
import { Link } from 'react-router-dom';

export function Message ({ messages, title}){
  if (!messages.length) {
    return <h3>No Messages Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {messages &&
        messages.map((message) => (
          <div key={message._id} className=" card-rounded mb-3">
            <h4 className="">
            </h4>
            <div className="card card-rounded card-body bg-light p-1">
              <p>{message.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};


