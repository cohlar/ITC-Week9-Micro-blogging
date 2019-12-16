import React from 'react';
import { getMessages, postMessage } from '../lib/api.js';
import PostMessage from '../components/PostMessage.js';
import Message from '../components/Message.js';
import './home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    async getMessages() {
        try {
            const response = await getMessages();
            const sortedMessages = this.sortMessages(response.data.tweets);
            this.setState({ messages: sortedMessages });
        }
        catch (error) {
            alert('Server is down, please try again later. For additional details about the error, please see console.');
            console.log(error);
        }
    }

    sortMessages(arr) {
        arr.sort((a,b) => (a.date > b.date) ? 1 : -1);
    }

    componentDidMount() {
        this.getMessages();
    }

    render() {
        const { messages } = this.state;
        console.log(messages);
        return (
            <main>
                <PostMessage />
                <div className='msg-container'>
                    {/* {messages.map( (msg) => {
                        <Message
                            username={msg.userName}
                            content={msg.content}
                            timestamp={msg.date}
                        />
                    })} */}
                    <Message username='yonatan' content='Lorem Ipsum' timestamp='2019-12-16' />
                    <Message username='yonatan' content='Lorem Ipsum' timestamp='2019-12-16' />
                    <Message username='yonatan' content='Lorem Ipsum' timestamp='2019-12-16' />
                </div>
            </main>
        );
    }
}