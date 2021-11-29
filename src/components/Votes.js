import {useState} from "react";
import {patchUpdateVotes} from "../utils/api";

const Votes = ({votesOnArticle, article_id, className}) => {
  const [votes, setVotes] = useState(votesOnArticle);

  // functionality for vote inc / dec buttons; each button should do the same thing with a different number (+/-)
  // optimistic rendering, tries to patch with voteMod, then updates the user-facing element anyway
  const handleClick = (voteMod) => {
    (async () => {
      try {
        patchUpdateVotes(article_id, voteMod);
      } catch (err) {
        console.log(err);
      }
    })();
    setVotes((prevVote) => {
      const newVote = prevVote + voteMod;
      return newVote;
    });
  };

  // component render, buttons pass a +1 or -1 to the same function
  return (
    <div className={className}>
      <button
        onClick={() => {
          handleClick(-1);
        }}
      >
        -
      </button>
      <p>Votes: {votes}</p>
      <button
        onClick={() => {
          handleClick(1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Votes;
