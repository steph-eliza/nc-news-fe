import {useContext} from "react";
import {useState} from "react/cjs/react.development";
import {UserContext} from "../contexts/userContext";
import {postCommentToArticle} from "../utils/api";

const PostForm = ({article_id}) => {
  const {currentUser} = useContext(UserContext);
  const [inputState, setInputState] = useState("");
  const [hasPosted, setHasPosted] = useState(false);

  const handleSubmission = (event) => {
    event.preventDefault();
    console.log(article_id, currentUser.username, inputState);
    postCommentToArticle(article_id, currentUser.username, inputState);
    setInputState("");
    setHasPosted(true);
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmission(event)}>
        <fieldset>
          <legend>Add a comment :</legend>
          <label htmlFor="comment_body" />
          <textarea
            id="comment_body"
            name="comment_body"
            rows="8"
            cols="60"
            onChange={(event) => {
              setInputState(event.target.value);
            }}
            value={inputState}
          />
          <input
            type="submit"
            value={hasPosted ? "Posted!" : "Post Comment"}
            disabled={hasPosted}
          />
        </fieldset>
      </form>
    </div>
  );
};

export default PostForm;
