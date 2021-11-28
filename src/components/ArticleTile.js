import {Link} from "react-router-dom";
import Votes from "./Votes";

const ArticleTile = ({allArticles}) => {
  // takes article data, maps fields into a set of html elements
  return (
    <div className="articleTileWrapper">
      {allArticles.map((article) => {
        return (
          <div className="articleTile" key={article.article_id}>
            <Link to={`/articles/article/${article.article_id}`}>
              <h3 className="atTitle">{article.title}</h3>
            </Link>
            <Votes
              votesOnArticle={article.votes}
              article_id={article.article_id}
              className="atVotes"
            />
            <p className="atTopic">In: {article.topic}</p>
            <p className="atComments">Comments: {article.comment_count}</p>
            <p className="atAuthor">By: {article.author}</p>
            <p className="atCreated">Posted: {article.created_at}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleTile;
