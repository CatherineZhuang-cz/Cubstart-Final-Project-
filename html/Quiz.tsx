import React from "react";
import "../styles/App.css";
import Navbar from "../my-app/src/components/Navbar";
import {useEffect, useState} from 'react'; 

const BASE_URL = "https://opentdb.com/api.php?amount=10&encode=url3986";

interface Post {
  id: number;
  title: string;
}

const Quiz = () => {
  const [post, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch("${BASE_URL}/posts");
      const posts = await response.json() as Post[];
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );

}


export default Quiz;