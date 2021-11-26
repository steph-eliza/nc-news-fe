import {useContext, useEffect} from "react";
import {UserContext} from "../contexts/userContext";
import {getArticleComments} from "../utils/api";
import Delete from "./DeleteComment";

const CommentTile = ({article_id, commentData, setCommentData}) => {
  // needs to access user's username to tell if a comment can render a delete button or not; can't just put one on any comment
  const {currentUser} = useContext(UserContext);

  // getting all comment data, changes on article id change ( new page )
  useEffect(() => {
    (async () => {
      const articleComments = await getArticleComments(article_id);
      setCommentData(articleComments);
    })();
  }, [article_id, setCommentData]);

  // component render
  return commentData.map((comment) => {
    // only renders a delete button on the comments whose author matches the current user
    // delete onClick functionality to rerender comments after deletion is defined as a callback in this file, passed as an argument to the actual button component
    if (comment.author === currentUser.username) {
      return (
        <div className="commentTile" key={comment.comment_id}>
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
          <p className="messageBody">{comment.body}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      );
    } else {
      // comments not posted by currentUser
      return (
        <div className="commentTile" key={comment.comment_id}>
          <p>By: {comment.author}</p>
          <p>Posted: {comment.created_at}</p>
          <p className="messageBody">{comment.body}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      );
    }
  });
};

export default CommentTile;
