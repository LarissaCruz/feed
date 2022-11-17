import { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../services/Api.js";
import "./Feed.css";
import Avatar from "../components/Avatar.js";


function Feed() {
  const text = "Hello World";
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    //Chamadas em tempo real via Socket
    registerToSocket();
    requestPost();
  }, [feed]);

  const requestPost = async () => {
    const response = await api.get("posts");
    //atualiza o response quando muda a variável feed
    setFeed(response.data);
  };

  const registerToSocket = () => {
    const socket = io("http://localhost:3333");
    //Escuta as mensagens de post
    socket.on("newpostSocket", (newPost) => {
      setFeed({ newPost, ...feed });
    });
  };

  return (
    <section id="post-list">
      {feed.map((post) => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <Avatar/>
              <span>{post.author}</span>
           
            </div>
            <p>07/08/2022</p>
          </header>

          <img src={`http://localhost:3333/files/${post.image}`} alt="" />

          <footer>
            <p>
              {post.description} <br />
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
}

export default Feed;
