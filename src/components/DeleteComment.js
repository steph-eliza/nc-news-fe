import {deleteCommentOnArticle} from "../utils/api";

const Delete = ({comment_id, onClick}) => {
  const handleDeletion = () => {
    console.log(comment_id);
    onClick();
    try {
      deleteCommentOnArticle(comment_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={handleDeletion}>[x]</button>
    </div>
  );
};

export default Delete;
