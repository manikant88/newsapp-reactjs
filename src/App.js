import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import NewsCard from "./components/NewsCard";
import SearchBar from "./components/SearchBar";
import ResultCount from "./components/ResultCount"

const api =
  "https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json";

const Newsapp = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState([]);
  const [reload, setReload] = useState(true);
  const localyStoredNews = window.localStorage.getItem('liked-news') 
  const getLikedNews = localyStoredNews === null ? [] : localyStoredNews;
  
  useEffect(() => {    
    axios
      .get(api)
      .then(response => setNews(response.data.items))
      .catch(error => console.log(error));
  }, []);

  const onchange = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const searchedNews = news.filter(newsItem => {
    return newsItem.story.headline.toLowerCase().indexOf(search) !== -1;
  });

  return (
    <div className="app">
      <SearchBar onSearch={onchange}/>
      <ResultCount resultLength={searchedNews.length} totalNews={news.length} />
      <main>
        {searchedNews.map((newsItem, index) => {
          const {
            id,
            headline,
            "author-name": authorName,
            "hero-image-s3-key": image,
            "hero-image-metadata": { "file-name": fileName },
            "published-at": date,
            url
          } = newsItem.story;

          const localNews = getLikedNews.indexOf(id)

          return (
            <NewsCard
              key={index}
              newsId={id}
              headline={headline}
              authorName={authorName}
              url={url}
              fileName={fileName}
              image={image}
              date={date}
              locNews={localNews !== -1 ? false : true }
              firstRender={reload}
              setRender={setReload}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Newsapp;