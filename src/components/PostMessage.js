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
    }

    onChangeHandler(event) {
        const newMessage = {};
        newMessage.content = event.target.value;
        newMessage.date = new Date();
        newMessage.date = newMessage.date.toISOString();
        newMessage.userName = getUser().displayName;
        this.setState({ message: newMessage })
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
                                {errorPost.length>0 &&
                                    <span className='error-msg'>
                                        {errorPost}
                                    </span>
                                }
                                {errorPost.length===0 && isTooLong &&
                                    <span className='error-msg'>
                                        The message can't contain more than 140 chars.
                                    </span>
                                }
                            </span>
                            <button
                                onClick={() => postMessage(message)}
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