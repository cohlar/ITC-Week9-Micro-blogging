import React from 'react';
import { getUser } from '../lib/firebase.js';
import HomeContext from '../contexts/HomeContext.js';

export default class PostMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageContent: '',
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        let newMessageContent = '';
        newMessageContent = event.target.value;
        this.setState({ messageContent: newMessageContent });
    }

    onSubmitHandler(callback) {
        const { messageContent } = this.state;
        const newMessage = {};
        newMessage.content = messageContent;
        newMessage.date = new Date().toISOString();
        newMessage.userId = getUser().uid;
        callback(newMessage);
    }

    render() {
        const { messageContent } = this.state;
        const isTooLong = (messageContent && (messageContent.length > 140));
        const isEmpty = !(messageContent && (messageContent.length > 0));

        return (
            <HomeContext.Consumer>
                {({ postMessage, isLoadingPost, errorPost }) => (
                    <div className='post-msg-container'>

                        <textarea
                            placeholder='What you have in mind...'
                            className='post-msg-input'
                            onChange={this.onChangeHandler}
                        >
                        </textarea>

                        <div className='btn-container'>
                            <span className='error-placeholder'>
                                {errorPost.length > 0 &&
                                    <span className='error-msg'>
                                        {errorPost}
                                    </span>
                                }
                                {errorPost.length === 0 && isTooLong &&
                                    <span className='error-msg'>
                                        The message can't contain more than 140 chars.
                                    </span>
                                }
                            </span>
                            <button
                                onClick={() => this.onSubmitHandler(postMessage)}
                                disabled={isEmpty || isTooLong || isLoadingPost}
                                className={(isLoadingPost) ? 'loading' : ''}
                            >
                                Post
                            </button>
                        </div>

                    </div>
                )}
            </HomeContext.Consumer>
        );
    }
}