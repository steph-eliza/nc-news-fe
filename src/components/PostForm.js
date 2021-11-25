import {useState} from "react/cjs/react.development";

const PostForm = () => {
  const [inputState, setInputState] = useState("");

  const handleSubmission = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmission(event)}>
        <fieldset>
          <legend>Add a comment :</legend>
          <label htmlFor="username" />
          <input
            id="username"
            name="username"
            type="text"
            onChange={(event) => {
              setInputState(event.target.value);
            }}
            value={inputState}
          />
          <label htmlFor="comment_body" />
          <input
            id="comment_body"
            name="comment_body"
            type="text"
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
