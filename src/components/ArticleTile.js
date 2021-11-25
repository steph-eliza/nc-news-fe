import {Link} from "react-router-dom";

const ArticleTile = ({allArticles, setAllArticles}) => {
  return allArticles.map((article) => {
    return (
      <div className="articleTile" key={article.article_id}>
        <Link to={`/articles/article/${article.article_id}`}>
          <h3>{article.title}</h3>
        </Link>
        <p>Topic: {article.topic}</p>
        <p>By: {article.author}</p>
        <p>Votes: {article.votes}</p>
        <p>Posted: {article.created_at}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
    );
  });
};

export default ArticleTile;
