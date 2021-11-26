import {deleteCommentOnArticle} from "../utils/api";

const Delete = ({comment_id, onClick}) => {
  // optimistic rendering, updating the front end on click removes the potential to send a bunch of delete requests for the same item
  const handleDeletion = () => {
    console.log(comment_id);
    onClick(); // function from in commentTile, updates state causing a rerender so there's no need to refresh the page
    try {
      deleteCommentOnArticle(comment_id);
    } catch (err) {
      console.log(err);
    }
  };

  // component render
  return (
    <div className="delete">
      <button onClick={handleDeletion}>[x]</button>
    </div>
  );
};

export default Delete;
