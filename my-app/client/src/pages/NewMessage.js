import {useState} from 'react';
import { useQuery } from "@apollo/client"
import { QUERY_MESSAGES } from "../utils/queries";


const Message = (props) => {

    return <div>
        <h3>{ props.description }</h3>
    </div>
}

export function NewMessage(){

    const { data } = useQuery(QUERY_MESSAGES);
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    const handleChangeMessage = (event) => {
        setMessage(event.currentTarget.value);
    }

    var messages = data == null ? [] : data.messages;

    return <div>
        <h1>New Message</h1>
        <code>{messages.map(message => <Message description={message.description} />)}</code>
        <form onSubmit={handleSubmit}>
            <textarea name="body"  placeholder="start typing here..."  value={message} onChange={handleChangeMessage}/>
            <br />
            <br />
            <button className="button-primary"> Send Message </button>
        </form>
    </div>
}