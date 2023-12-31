"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
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
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setposts] = useState([]);
  const { data: session } = useSession();
  const fetchposts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setposts(data);
  };
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);
    setsearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  useEffect(() => {
    fetchposts();
  }, []);
  console.log(posts);
  const handleTagClick = (tagName) => {
    setsearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  return session ? (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  ) : (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
       <div></div>
      )}
    </section>
  );
};

export default Feed;
