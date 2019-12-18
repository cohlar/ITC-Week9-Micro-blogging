import React from 'react';
import { getMessages, postMessage } from '../../lib/api.js';
import HomeContext from '../../contexts/HomeContext.js';
import PostMessage from '../../components/PostMessage.js';
import Message from '../../components/Message.js';
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
        this.getMessages = this.getMessages.bind(this);
    }

    async getMessages() {
        this.setState({ isLoadingGet: true });
        try {
            const response = await getMessages();
            const sortedMessages = this.sortMessages(response.data.tweets);
            this.setState({ messages: sortedMessages });
            if (this.state.errorGet.length > 0) {
                this.setState({ errorGet: '' });
            }
        }
        catch (error) {
            this.setState({ errorGet: error.toString() });
        }
        this.setState({ isLoadingGet: false });
    }

    async postMessage(newMsg) {
        this.setState({ isLoadingPost: true });
        try {
            await postMessage(newMsg)
            if (this.state.errorPost.length > 0) {
                this.setState({ errorPost: '' });
            }
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
        this.interval = setInterval(this.getMessages, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { messages, isLoadingGet, errorGet } = this.state;
        return (
            <main>
                <HomeContext.Provider value={this.state}>
                    <PostMessage />
                </HomeContext.Provider>

                <div
                    className={(isLoadingGet && messages.length === 0) ? 'msg-container loading' : 'msg-container'}
                >

                    {errorGet.length > 0 && 
                        <div className='error-msg'>{errorGet}</div>
                    }

                    {errorGet.length === 0 &&
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