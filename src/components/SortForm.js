const SortForm = ({setAllArticles}) => {
  return (
    <div className="sortForm">
      <form>
        <fieldset>
          <legend>Sort</legend>
          <label htmlFor="sortField">Field:</label>
          <select name="sortField" id="sortField">
            <option value="">Select an option ...</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="dateCreated">Date Created</option>
            <option value="votes">Votes</option>
            <option value="commentCount">Comment Count</option>
          </select>
          <label htmlFor="orderField">Order:</label>
          <select name="orderField" id="orderField">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <input type="submit" value="submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default SortForm;
