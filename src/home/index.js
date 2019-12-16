import React from 'react';
import PostMessage from '../components/PostMessage.js';
import Message from '../components/Message.js';
import './home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     messages: [],
        // }
    }

    render() {
        // const { messages } = this.state;
        return (
            <main>
                <PostMessage />
                <div className='msg-container'>
                    <Message username='yonatan' message='Lorem Ipsum' timestamp='2019-12-16' />
                    <Message username='yonatan' message='Lorem Ipsum' timestamp='2019-12-16' />
                    <Message username='yonatan' message='Lorem Ipsum' timestamp='2019-12-16' />
                </div>
            </main>
        );
    }
}