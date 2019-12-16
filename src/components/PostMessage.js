import React from 'react';

export default class PostMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    render() {
        const { message } = this.state;
        const isTooLong = (message.length > 140);
        return (
            <div className='post-msg-container'>

                <textarea
                    placeholder='What you have in mind...'
                    className='post-msg-input'
                    onChange={(event) => this.setState({ message: event.target.value })}
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
                        className='post-msg-btn'
                        disabled={isTooLong}
                    >
                        Post
                    </button>
                </div>

            </div>
        );
    }
}