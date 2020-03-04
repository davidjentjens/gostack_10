import React from 'react';

import "./Post.css"

import Comment from '../Comment/Comment';

function Post({ content }){
  return (
    <li>
      <div className="post shadow">
        <div className="author">
          <img src={content.author.avatar} className="avatar"/>
          <div className="nameDate">
            <h4>{content.author.name}</h4>
            <p>{content.date}</p>
          </div>
        </div>
        <p className="post_content">{content.content}</p>   
        <hr/>
        <ul>
          {content.comments.map(comment => <Comment key={comment.id} content={comment}/>)}
        </ul>
      </div>
    </li>
  );
}

export default Post;