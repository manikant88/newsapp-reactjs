import React, { useState, useEffect } from "react";
import "../App.css";

const NewsCard = ({
  newsId,
  headline,
  authorName,
  url,
  fileName,
  image,
  date,
  locNews,
  setRender,
  firstRender
}) => {
  const [like, setLike] = useState([]);
  const [likedNews, setLikedNews] = useState();
  const localyStoredNews = JSON.parse(window.localStorage.getItem("liked-news"));
  const storedNews = localyStoredNews === null ? [] : localyStoredNews;

  useEffect(() => {
    if (!firstRender) {
      if (like) {
        removeDislikedNewsFromLocalStorage();
      } else {
        const newsIndex = storedNews.indexOf(newsId);
        if (newsIndex !== -1) {
          removeDislikedNewsFromLocalStorage();
        } else {
          addLikedNewsToLocalStorage()
        }
      }
    }
  }, [like]);

  const addLikedNewsToLocalStorage = () => {
    const likedArr = storedNews === null ? [newsId] : [...storedNews, newsId];
    window.localStorage.setItem("liked-news", JSON.stringify(likedArr));
    setLikedNews(storedNews.length + 1);
  }

  const removeDislikedNewsFromLocalStorage = () => {
    const disklikedArr = storedNews.filter(disklikeNews => {
      if (disklikeNews !== newsId) {
        return disklikeNews;
      }
    });
    window.localStorage.setItem("liked-news", JSON.stringify(disklikedArr));
    setLikedNews(storedNews.length - 1);
  };

  const onLike = () => {
    if (firstRender) {
      setRender(false);
    }

    if (like) {
      setLike(false);
      locNews = true;
    } else {
      setLike(true);
      locNews = false;
    }
  };

  const getDate = publishedDate => {
    let d = new Date(publishedDate);
    return d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
  };

  return (
    <div key={newsId} className="news-article">
      <div className="news-img">
        <img src={`https://gumlet.assettype.com/` + image} alt={fileName} className="image" />
      </div>
      <div className="news-description">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="news-title">{headline}</div>
        </a>
        <div className="news-meta">
          <div>By {authorName}</div>
          <div>{getDate(date)}</div>
        </div>
        <button
          className={`like ${locNews ? (like ? "" : "liked") : (likedNews >= 0 && !locNews) ? "" : "liked"} `}
          onClick={onLike}
        />
      </div>
    </div>
  );
};

export default NewsCard;