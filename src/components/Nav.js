import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {getTopics} from "../utils/api";
import {useState} from "react/cjs/react.development";
import {UserContext} from "../contexts/userContext";

const Nav = ({topics, setTopics}) => {
  const {currentUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // loading pattern reset and api request for all topics
    setIsLoading(true);
    (async () => {
      const topicData = await getTopics();
      setTopics(topicData);
      setIsLoading(false);
    })();
  }, [setTopics]);

  // component rendering
  if (isLoading) return <p> ... </p>;
  return (
    <nav>
      <p className="userGreeting">hello {currentUser.username}</p>
      <Link to="/articles" className="topicNavLink">
        All
      </Link>
      {topics.map((topic) => {
        return (
          <Link
            to={`/articles/${topic.slug}`}
            key={topic.slug}
            className="topicNavLink"
          >
            {`${topic.slug}`}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
