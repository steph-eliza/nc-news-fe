import {useParams} from "react-router";
import {useState} from "react/cjs/react.development";
import {getArticles} from "../utils/api";

const SortForm = ({setAllArticles}) => {
  const {topic_slug} = useParams();
  const [isInvalidSelection, setIsInvalidSelection] = useState(false);

  const handleSubmit = (event) => {
    // stop page refresh and get rid of the error message if there is one after multiple attempts
    event.preventDefault();
    setIsInvalidSelection(false);

    const sortSelection = event.target[1].value;
    const orderSelection = event.target[2].value;

    if (sortSelection === "") {
      setIsInvalidSelection(true);
    } else {
      // send to axios
      // return a new list of articles from the query
      (async () => {
        const sortedArticles = await getArticles(
          topic_slug,
          sortSelection,
          orderSelection
        );

        // have the useEffect in ArticleList change and be forced to re-render
        setAllArticles(sortedArticles);
      })();
    }
  };

  // conditional rendering for if the user doesn't pick a sort field
  if (isInvalidSelection) {
    return (
      <div className="sortForm">
        <form onSubmit={(event) => handleSubmit(event)}>
          <fieldset>
            <legend>Sort</legend>
            <label htmlFor="sortField">Sort by:</label>
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
            <p>Please select a sort field !</p>
          </fieldset>
        </form>
      </div>
    );
  } else {
    // the user actually picked a thing gj 🎉
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
  }
};

export default SortForm;
