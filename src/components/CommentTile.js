import {useContext, useEffect} from "react";
import {useState} from "react/cjs/react.development";
import {UserContext} from "../contexts/userContext";
import {getArticleComments} from "../utils/api";
import Delete from "./DeleteComment";

const CommentTile = ({article_id, commentData, setCommentData}) => {
  const {currentUser} = useContext(UserContext);
  // const [commentData, setCommentData] = useState([]);

  // getting all comment data, changes on article id change ( new page )
  useEffect(() => {
    (async () => {
      const articleComments = await getArticleComments(article_id);
      setCommentData(articleComments);
    })();
  }, [article_id]);

  return commentData.map((comment) => {
    // only renders a delete button on the comments whose author matches the current user
    if (comment.author === currentUser.username) {
      return (
        <div className="commentContainer" key={comment.comment_id}>
          <p>By: {comment.author}</p>
          <p>Posted: {comment.created_at}</p>
          <Delete
            comment_id={comment.comment_id}
            onClick={() => {
              setCommentData((data) =>
                data.filter((post) => post.comment_id !== comment.comment_id)
              );
            }}
          />
          <p>{comment.body}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      );
    } else {
      return (
        <div className="commentContainer" key={comment.comment_id}>
          <p>By: {comment.author}</p>
          <p>Posted: {comment.created_at}</p>
          <p>{comment.body}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      );
    }
  });
};

export default CommentTile;
