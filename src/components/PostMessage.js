import React from 'react';
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
        newMessage.date = new Date;
        newMessage.date = (newMessage.date.toISOString());
        newMessage.userName = localStorage.getItem('savedUsername');
        this.setState({ message: newMessage })
    }

    render() {
        const { message } = this.state;
        const isTooLong = (!!message.content && (message.content.length > 140));
        return (
            <HomeContext.Consumer>
                {({ addMessage, isLoadingPost }) => (
                    <div className='post-msg-container'>

                        <textarea
                            placeholder='What you have in mind...'
                            className='post-msg-input'
                            onChange={this.onChangeHandler}
                        >
                        </textarea>

                        <div className='btn-container'>
                            <span className='error-placeholder'>
                                {isTooLong &&
                                    <span className='error-msg'>
                                        The message can't contain more than 140 chars.
                                    </span>
                                }
                            </span>
                            <button
                                onClick={() => addMessage(message)}
                                disabled={isTooLong || isLoadingPost}
                                className={ isLoadingPost && 'postLoader' }
                            >
                                Post
                            </button>
                            {/* <img src='../img/btn-loader.gif' alt='Loading...' /> */}
                        </div>

                    </div>
                )}
            </HomeContext.Consumer>
        );
    }
}