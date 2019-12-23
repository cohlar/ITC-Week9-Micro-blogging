import React from 'react';
import { postMessage, setMessageListener } from '../../lib/firebase.js';
import HomeContext from '../../contexts/HomeContext.js';
import PostMessage from '../../components/PostMessage.js';
import Message from '../../components/Message.js';
import './home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            postMessage: this.postMessage.bind(this),
            isLoadingPost: false,
            errorGet: '',
            errorPost: '',
        }
        this.messageListenerSuccessHandler = this.messageListenerSuccessHandler.bind(this);
        this.messageListenerErrorHandler = this.messageListenerErrorHandler.bind(this);
    }

    messageListenerSuccessHandler(querySnapshot) {
        this.setState({ messages: querySnapshot.docs });
        if (this.state.errorGet.length > 0) {
            this.setState({ errorGet: '' });
        }
    }

    messageListenerErrorHandler(error) {
        this.setState({ errorGet: error.toString() }); 
    }

    async postMessage(newMsg) {
        this.setState({ isLoadingPost: true });
        try {
            await postMessage(newMsg);
            if (this.state.errorPost.length > 0) {
                this.setState({ errorPost: '' });
            }
        }
        catch (error) {
            this.setState({ errorPost: error.toString() });
        }
        this.setState({ isLoadingPost: false });
    }

    componentDidMount() {
        this.unsuscribe = setMessageListener(this.messageListenerSuccessHandler, this.messageListenerErrorHandler);
    }

    componentWillUnmount() {
        this.unsuscribe();
    }

    render() {
        const { messages, errorGet } = this.state;
        return (
            <main>
                <HomeContext.Provider value={this.state}>
                    <PostMessage />
                </HomeContext.Provider>

                <div
                    className={(messages.length === 0) ? 'msg-container loading' : 'msg-container'}
                >

                    {errorGet.length > 0 &&
                        <div className='error-msg'>{errorGet}</div>
                    }

                    {errorGet.length === 0 &&
                        messages &&
                        messages.map((msg) => {
                            return (
                                <Message
                                    userId={msg.data().userId}
                                    content={msg.data().content}
                                    date={msg.data().date}
                                    key={msg.id}
                                />
                            );
                        })}

                </div>
            </main>
        );
    }
}