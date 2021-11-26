import {Link} from "react-router-dom";
import Votes from "./Votes";

const ArticleTile = ({allArticles}) => {
  // takes article data, maps fields into a set of html elements
  return allArticles.map((article) => {
    return (
      <div className="articleTile" key={article.article_id}>
        <Link to={`/articles/article/${article.article_id}`}>
          <h3>{article.title}</h3>
        </Link>
        <Votes votesOnArticle={article.votes} article_id={article.article_id} />
        <p>In: {article.topic}</p>
        <p>Comments: {article.comment_count}</p>
        <p>By: {article.author}</p>
        <p>Posted: {article.created_at}</p>
      </div>
    );
  });
};

export default ArticleTile;
