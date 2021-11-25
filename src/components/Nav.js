import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {getTopics} from "../utils/api";
import {useState} from "react/cjs/react.development";
import {UserContext} from "../contexts/userContext";

const Nav = ({topics, setTopics}) => {
  const {currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // fetch all topics from the api
  useEffect(() => {
    // reset loading for each instance of topic rerendering
    setIsLoading(true);
    (async () => {
      const topicData = await getTopics();
      setTopics(topicData);
      setIsLoading(false);
    })();
  }, [setTopics]);

  // page return
  if (isLoading) return <p> ... </p>;
  return (
    <nav>
      <p>hello {currentUser.username}</p>
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
