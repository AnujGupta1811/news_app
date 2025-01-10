import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Readmore.css'; // Import the CSS file

function FullArticle() {
  const location = useLocation();
  const navigate = useNavigate();

  const { article } = location.state || {}; 

  if (!article) {
    return (
      <div className="full-article">
        <center>
        <h1 style={{ color: 'red' }}>Error: No article data found</h1>
        <p>You need to navigate through the homepage to view an article.</p>
        <button onClick={() => navigate('/')} className="readmore">Go back to Home</button>
        </center>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="full-article center">
      <h1>Read Full Article</h1>
      <h1 className="title">{article.title}</h1>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
      <h4>{article.content}</h4>
      <h4>{article.description}</h4>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <button className="readmore">Read original article</button>
      </a><br></br>
      <button onClick={() => navigate('/')} className="readmore">Go back to Home</button>
    </div>
      <Footer />
      </>
  );
}

export default FullArticle;
