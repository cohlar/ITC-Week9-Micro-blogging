import React from 'react';
import { getMessages, postMessage } from '../lib/api.js';
import HomeContext from '../contexts/HomeContext.js';
import PostMessage from '../components/PostMessage.js';
import Message from '../components/Message.js';
import './home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            addMessage: this.addMessage.bind(this),
            isLoadingGet: false,
            isLoadingPost: false,
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

    async postMessage(newMsg) {
        try {
            this.setState({ isLoadingPost: true });
            await postMessage(newMsg);
        }
        catch (error) {
            alert('Server is down, please try again later. For additional details about the error, please see console.');
            console.log(error);
        }
        setTimeout(() => this.setState({ isLoadingPost: false }), 1000);    // Because the server is too fast... we want users to see our loader :)
    }

    sortMessages(arr) {
        return arr.sort((a, b) => (a.date < b.date) ? 1 : -1);
    }

    addMessage(newMsg) {
        this.postMessage(newMsg);
        this.setState((prevState) => ({ messages: [newMsg, ...prevState.messages] }));
    }

    componentDidMount() {
        this.getMessages();
    }

    render() {
        const { messages } = this.state;
        return (
            <main>
                <HomeContext.Provider value={this.state}>
                    <PostMessage />
                </HomeContext.Provider>

                <div className='msg-container'>
                    {!!messages && messages.map((msg) => <Message userName={msg.userName} content={msg.content} date={msg.date} key={msg.userName + msg.date} />)}
                    {/* <Message username='yonatan' content='Lorem Ipsum' timestamp='2019-12-16' />
                    <Message username='yonatan' content='Lorem Ipsum' timestamp='2019-12-16' />
                    <Message username='yonatan' content='Lorem Ipsum' timestamp='2019-12-16' /> */}
                </div>
            </main>
        );
    }
}