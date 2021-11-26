import {Link} from "react-router-dom";
import Votes from "./Votes";

const ArticleTile = ({allArticles, setAllArticles}) => {
  return allArticles.map((article) => {
    return (
      <div className="articleTile" key={article.article_id}>
        <Link to={`/articles/article/${article.article_id}`}>
          <h3>{article.title}</h3>
        </Link>
        <p>Topic: {article.topic}</p>
        <p>By: {article.author}</p>
        <Votes votesOnArticle={article.votes} article_id={article.article_id} />
        <p>Posted: {article.created_at}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
    );
  });
};

export default ArticleTile;
