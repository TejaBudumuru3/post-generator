import React from 'react';

const Message = ()=>{
    return(
        <>
        <div className='message-section'>
            <div className="message-container">
                <h2>Please wait...</h2>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className='message-text'>Generating a post..</p>
            </div>
        </div>
        
        </>);
}

export default Message;