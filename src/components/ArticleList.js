import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getAllArticles} from "../utils/api";
import ArticleTile from "./ArticleTile";
import Header from "./Header";
import SortForm from "./SortForm";

const ArticleList = ({topics}) => {
  // takes the parameter from the end of the url
  const {topic_slug} = useParams();
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch all articles from api based on nav link selection
  useEffect(() => {
    // reset loading each time a new thing is clicked otherwise it'll never bring up that feedback after the first time
    setIsLoading(true);
    if (!topic_slug) {
      // "All Articles"
      (async () => {
        try {
          const articleData = await getAllArticles();
          setAllArticles(articleData);
          // fetching finished
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      // if there actually is a specific topic
      (async () => {
        try {
          const articleData = await getAllArticles(topic_slug);
          setAllArticles(articleData);
          // fetching finished
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [topic_slug]);

  // page return, loading pattern
  if (isLoading) return <p>loading ...</p>;
  if (!topic_slug) {
    // creating all topics, no specific nav category picked
    return (
      <div>
        <Header headerText="All Topics" />
        <SortForm setAllArticles={setAllArticles} />
        <ArticleTile
          allArticles={allArticles}
          setAllArticles={setAllArticles}
        />
      </div>
    );
  } else {
    // creating an individual topic object based on the currently examined object to get the description programmatically
    const topicObj = topics.find((topic) => {
      return topic.slug === topic_slug;
    });
    // could just assign straight away, but theoretically you might run into issues of a topic returning after articles
    // async is only 'synchronous' in its own scope so it _could_ happen allegedly
    let topicDescription = "";
    if (topicObj) topicDescription = topicObj.description;

    return (
      // populate in case of a specific picked topic
      <div className="articleList">
        <Header headerText={topic_slug} subHeaderText={topicDescription} />
        <SortForm setAllArticles={setAllArticles} />
        <ArticleTile
          allArticles={allArticles}
          setAllArticles={setAllArticles}
        />
      </div>
    );
  }
};

export default ArticleList;
