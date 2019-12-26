import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { postMessage, setMessageListener, getMessagesStartAfter } from '../../lib/firebase.js';
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
            hasMore: false,
        }
        this.limit = 10;
        this.messageListenerSuccessHandler = this.messageListenerSuccessHandler.bind(this);
        this.messageListenerErrorHandler = this.messageListenerErrorHandler.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.isComponentMounted = false;
        this.lastVisible = null;
    }

    messageListenerSuccessHandler(querySnapshot) {
        this.setState({ messages: querySnapshot.docs });
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        if (this.state.errorGet.length > 0) {
            this.setState({ errorGet: '' });
        }
        if (querySnapshot.docs.length === this.limit) {
            this.setState({ hasMore: true });
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

    loadMore = async () => {
        const querySnapshot = await getMessagesStartAfter(this.lastVisible, this.limit);
        if (querySnapshot.docs.length > 0) {
            const currentMessages = this.state.messages;
            this.setState({ messages: currentMessages.concat(querySnapshot.docs) });
            this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        } else {
            this.setState({ hasMore: false });
        }
    }

    componentDidMount() {
        this.unsuscribe =
            setMessageListener(this.messageListenerSuccessHandler, this.messageListenerErrorHandler, this.limit);
        this.isComponentMounted = true;
    }

    componentWillUnmount() {
        this.unsuscribe();
        this.isComponentMounted = false;
    }

    render() {
        const { messages, errorGet, hasMore } = this.state;
        return (
            <main>
                <HomeContext.Provider value={this.state}>
                    <PostMessage />
                </HomeContext.Provider>

                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={hasMore}
                    loader={hasMore && <div className="msg-container loading" key={0}></div>}
                    initialLoad={false}
                >

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

                </InfiniteScroll>
            </main>
        );
    }
}