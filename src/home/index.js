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
            errorGet: '',
            errorPost: '',
        }
    }

    async getMessages() {
        this.setState({ isLoadingGet: true });
        try {
            const response = await getMessages();
            const sortedMessages = this.sortMessages(response.data.tweets);
            this.setState({ messages: sortedMessages });
        }
        catch (error) {
            this.setState({ errorGet: error.toString() });
        }
        this.setState({ isLoadingGet: false });
    }

    async postMessage(newMsg) {
        this.setState({ isLoadingPost: true });
        try {
            setTimeout(() => {}, 800);    // Because the server is too fast... we want users to see our beautiful loader :)
            await postMessage(newMsg)
        }
        catch (error) {
            this.setState({ errorPost: error.toString() });
        }
        this.setState({ isLoadingPost: false });
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
        const { messages, isLoadingGet, errorGet } = this.state;
        return (
            <main>
                <HomeContext.Provider value={this.state}>
                    <PostMessage />
                </HomeContext.Provider>

                <div
                    className={(isLoadingGet) ? 'msg-container loading' : 'msg-container'}
                >

                    {errorGet.length > 0 && 
                        <div className='error-msg'>{errorGet}</div>
                    }

                    {errorGet.length === 0 &&
                    !isLoadingGet &&
                    messages &&
                    messages.map((msg) => {
                        return (
                            <Message
                                userName={msg.userName}
                                content={msg.content}
                                date={msg.date}
                                key={msg.userName + msg.date}
                            />
                        );
                    })}

                </div>
            </main>
        );
    }
}