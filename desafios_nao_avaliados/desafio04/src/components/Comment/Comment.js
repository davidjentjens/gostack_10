import React from 'react';

import './Comment.css'

function Comment({ content }){
  return (
    <div className="comment_container">
      <img src={content.author.avatar} className="avatar_smaller"/>
      <div className="comment">
        <p><strong>{content.author.name}</strong> {content.content}</p>
      </div>  
    </div>
  )
}

export default Comment;