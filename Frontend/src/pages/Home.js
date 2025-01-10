import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];

function Home() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchNews = async () => {
      const category = search ? search.toLowerCase() : activeCategory;
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${category}&apiKey=f427b400450f42f6aacfd99beeda0b7b`
        );
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [activeCategory, search]);

  


  return (
    <main>
      <Header 
      handleSearchChange={handleSearchChange}
      />
      <div className="categories">
        <div className="container">
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSearch('');  // Clear search term when switching categories
                  setActiveCategory(category);  // Set active category
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="news-grid">
          {news.length > 0 ? (
            news.map((article, index) => (
              <article key={index} className="news-card">
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                <div className="news-content">
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-description">{article.description}</p>
                  <Link to={`/article/${index}`} state={{ article }} className="read-more">
                    Read More
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p>No news found for the selected category or search query.</p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
