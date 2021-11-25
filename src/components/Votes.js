import {useState} from "react/cjs/react.development";
import {patchUpdateVotes} from "../utils/api";

const Votes = ({votesOnArticle, articleID}) => {
  const [votes, setVotes] = useState(votesOnArticle);

  const handleClick = (voteMod) => {
    patchUpdateVotes(articleID, voteMod);
    setVotes((prevVote) => {
      const newVote = prevVote + voteMod;
      return newVote;
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClick(1);
        }}
      >
        +
      </button>
      <p>Votes: {votes}</p>
      <button
        onClick={() => {
          handleClick(-1);
        }}
      >
        -
      </button>
    </div>
  );
};

export default Votes;
