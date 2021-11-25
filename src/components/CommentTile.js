import {useEffect} from "react";
import {useState} from "react/cjs/react.development";
import {getArticleComments} from "../utils/api";

const CommentTile = ({article_id}) => {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    (async () => {
      const articleComments = await getArticleComments(article_id);
      setCommentData(articleComments);
    })();
  }, [article_id]);

  return commentData.map((comment) => {
    return (
      <div className="commentContainer" key={comment.comment_id}>
        <p>{comment.author}</p>
        <p>{comment.created_at}</p>
        <p>{comment.body}</p>
        <p>{comment.votes}</p>
      </div>
    );
  });
};

export default CommentTile;
