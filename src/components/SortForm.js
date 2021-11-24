import {useParams} from "react-router";
import {getArticles} from "../utils/api";

const SortForm = ({setAllArticles}) => {
  const {topic_slug} = useParams();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      event,
      event.target[1].value,
      event.target[2].value,
      "        <-- event"
    );

    // send to axios
    // return a new list of articles from the query
    (async () => {
      const sortedArticles = await getArticles(
        topic_slug,
        event.target[1].value,
        event.target[2].value
      );
      console.log(sortedArticles, "       <-- sortedArticles in sortform");
    })();

    // have the useEffect in ArticleList change and be forced to re-render
  };

  return (
    <div className="sortForm">
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <legend>Sort</legend>
          <label htmlFor="sortField">Field:</label>
          <select name="sortField" id="sortField">
            <option value="">Select an option ...</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="created_at">Date Created</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comment Count</option>
          </select>

          <label htmlFor="orderField">Order:</label>
          <select name="orderField" id="orderField">
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default SortForm;
