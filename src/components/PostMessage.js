import React from 'react';
import { getUser } from '../lib/firebase.js';
import HomeContext from '../contexts/HomeContext.js';

export default class PostMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        const newMessage = {};
        newMessage.content = event.target.value;
        this.setState({ message: newMessage });
    }

    onSubmitHandler(callback) {
        const { message } = this.state;
        const newMessage = {};
        newMessage.content = message.content;
        newMessage.date = new Date();
        newMessage.date = newMessage.date.toISOString();
        newMessage.userId = getUser().uid;
        this.setState({ message: newMessage }, () => callback(newMessage));
    }

    render() {
        const { message } = this.state;
        const isTooLong = (message.content && (message.content.length > 140));
        const isEmpty = !(message.content && (message.content.length > 0));

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