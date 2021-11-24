import {Link} from "react-router-dom";
import {useEffect} from "react";
import {getTopics} from "../utils/api";
import {useState} from "react/cjs/react.development";

const Nav = ({topics, setTopics}) => {
  const [isLoading, setIsLoading] = useState(true);

  // fetch all topics from the api
  useEffect(() => {
    // reset loading for each instance of topic rerendering
    setIsLoading(true);
    console.log("got into useEffect");
    (async () => {
      const topicData = await getTopics();
      setTopics(topicData);
      setIsLoading(false);
      console.log(topicData, "       <-- topicData return in useEffect");
    })();
  }, [setTopics]); // doesn't seem to make a difference at all if setTopics is included here or not ? it complains if it's not there so whatever

  console.log(topics, "       <-- allTopics after GET");

  // page return
  if (isLoading) return <p> ... </p>;
  return (
    <nav>
      <Link to="/articles">All</Link>
      {topics.map((topic) => {
        return (
          <Link to={`/articles/${topic.slug}`} key={topic.slug}>
            {`${topic.slug}`}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
