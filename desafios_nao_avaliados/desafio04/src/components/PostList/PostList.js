import React, { Component } from 'react';

import './PostList.css'

import Post from '../Post/Post';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "https://www.salutonagency.com/wp-content/uploads/2018/12/Profile-round-pj-300x300.png"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Julio Leite",
              avatar: "https://i0.wp.com/studiolorier.com/wp-content/uploads/2018/10/Profile-Round-Sander-Lorier.jpg?ssl=1"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus consectetur egestas. Maecenas odio enim, molestie vitae bibendum vel, tristique vel dolor. Praesent vel pharetra nulla. Aenean vestibulum maximus arcu at convallis. Nunc consequat volutpat diam at maximus. Etiam in suscipit sapien. Nulla finibus efficitur ex non tincidunt. Sed eu interdum libero."
          },
          {
            id: 2,
            author: {
              name: "Diego Fernandes",
              avatar: "https://blog.rocketseat.com.br/content/images/2019/05/profile.png"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus consectetur egestas. Maecenas odio enim, molestie vitae bibendum vel, tristique vel dolor. Praesent vel pharetra nulla. Aenean vestibulum maximus arcu at convallis. Nunc consequat volutpat diam at maximus."
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "David Jentjens",
          avatar: "https://lh3.googleusercontent.com/proxy/bb2k_s6OwqIZFlRu3m8PxiZ-3QlZW13vkmE_XBoHrVU1LqCwBR2vw71-qcmFLP7bC7rOHGRCwYcA_gVb-e1Hruujm9bngmalr3fnCHtIGTOaPJWTcFXPWk_mTikDzk-Co4sdKRY"
        },
        date: "04 Jan 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://blog.rocketseat.com.br/content/images/2019/05/profile.png"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus consectetur egestas. Maecenas odio enim, molestie vitae bibendum vel, tristique vel dolor. Praesent vel pharetra nulla. Aenean vestibulum maximus arcu at convallis. Nunc consequat volutpat diam at maximus. Etiam in suscipit sapien. Nulla finibus efficitur ex non tincidunt. Sed eu interdum libero."
          }
        ]
      },
      {
        id: 1,
        author: {
          name: "Diego Fernandes",
          avatar: "https://blog.rocketseat.com.br/content/images/2019/05/profile.png"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus consectetur egestas. Maecenas odio enim, molestie vitae bibendum vel, tristique vel dolor.",
        date: "04 Jun 2018",
        comments: [
          {
            id: 1,
            author: {
              name: "Julio Leite",
              avatar: "https://i0.wp.com/studiolorier.com/wp-content/uploads/2018/10/Profile-Round-Sander-Lorier.jpg?ssl=1"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            id: 2,
            author: {
              name: "Diego Fernandes",
              avatar: "https://blog.rocketseat.com.br/content/images/2019/05/profile.png"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus consectetur egestas. Maecenas odio enim, molestie vitae bibendum vel, tristique vel dolor. Praesent vel pharetra nulla. Aenean vestibulum maximus arcu at convallis. Nunc consequat volutpat diam at maximus. Etiam in suscipit sapien. Nulla finibus efficitur ex non tincidunt. Sed eu interdum libero."
          },
          {
            id: 3,
            author: {
              name: "Julio Alcantara",
              avatar: "https://www.salutonagency.com/wp-content/uploads/2018/12/Profile-round-pj-300x300.png"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus consectetur egestas. Maecenas odio enim, molestie vitae bibendum vel, tristique vel dolor. Praesent vel pharetra nulla. Aenean vestibulum maximus arcu at convallis. Nunc consequat volutpat diam at maximus."
          }
        ]
      },
    ]
  };

  render(){
    const { posts } = this.state;

    return (
      <div id="postlist">
        <ul>
          {posts.map(post => <Post key={post.id} content={post}/>)}
        </ul>
      </div>
    );
  }
}

export default PostList;