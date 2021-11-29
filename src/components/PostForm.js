import {useContext} from "react";
import {useState} from "react";
import {UserContext} from "../contexts/userContext";
import {postCommentToArticle} from "../utils/api";

const PostForm = ({article_id, setCommentData}) => {
  // needs user context to have a username capable of making the post; back end only accepts post requests with an existing username and a message body
  const {currentUser} = useContext(UserContext);
  const [inputState, setInputState] = useState("");
  const [hasPosted, setHasPosted] = useState(false);

  // prevent refresh on submit, hasPosted turns off the button after posting and gives feedback that it was successful
  const handleSubmission = (event) => {
    event.preventDefault();
    setInputState("");
    setHasPosted(true);
    (async () => {
      const newPost = await postCommentToArticle(
        article_id,
        currentUser.username,
        inputState
      );
      // page content rerenders because state gets changed after post request
      setCommentData((prevCommentData) => {
        const newCommentData = [...prevCommentData];
        newCommentData.push(newPost);
        return newCommentData;
      });
    })();
  };

  // component render, submit button flips to inactive after posting
  return (
    <div className="postForm">
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
