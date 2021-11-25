import {useContext} from "react";
import {useState} from "react/cjs/react.development";
import {UserContext} from "../contexts/userContext";
import {postCommentToArticle} from "../utils/api";

const PostForm = ({articleID}) => {
  const {currentUser} = useContext(UserContext);
  const [inputState, setInputState] = useState("");

  const handleSubmission = (event) => {
    event.preventDefault();
    console.log(articleID, currentUser.username, inputState);
    postCommentToArticle(articleID, currentUser.username, inputState);
    setInputState("");
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
          <input type="submit" value="Post Comment" />
        </fieldset>
      </form>
    </div>
  );
};

export default PostForm;
