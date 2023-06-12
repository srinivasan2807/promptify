"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setposts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventdefault;
    if (searchText.length >= 3) {
      const regex = new RegExp(searchText, "i");
       posts.filter(
        (post) =>
          post.prompt === regex ||
          post.tag === regex ||
          post.creator.username === regex
      )
    }
  };
  useEffect(() => {
    const fetchposts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setposts(data);
    };
    fetchposts();
  }, []);
  console.log(posts);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
