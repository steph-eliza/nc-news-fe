import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getArticles} from "../utils/api";
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
          const articleData = await getArticles();
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
          const articleData = await getArticles(topic_slug);
          setAllArticles(articleData);
          // fetching finished
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [topic_slug]);

  // page return
  if (isLoading) return <p>loading ...</p>;
  if (!topic_slug) {
    // populate in case of no filtering, all topics
    return (
      <div>
        <Header headerText="All Topics" />
        <SortForm setAllArticles={setAllArticles} />
        {allArticles.map((article) => {
          return (
            <div className="articleTile" key={article.article_id}>
              <h3>{article.title}</h3>
              <p>{article.topic}</p>
              <p>{article.author}</p>
              <p>{article.votes}</p>
              <p>{article.created_at}</p>
            </div>
          );
        })}
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
        {/* add description h2 */}
        <SortForm setAllArticles={setAllArticles} />
        {allArticles.map((article) => {
          return (
            <div className="articleTile" key={article.article_id}>
              <h3>{article.title}</h3>
              <p>Topic: {article.topic}</p>
              <p>By: {article.author}</p>
              <p>Votes: {article.votes}</p>
              <p>Posted: {article.created_at}</p>
              <p>Comments: {article.comment_count}</p>
            </div>
          );
        })}
        <p></p>
      </div>
    );
  }
};

export default ArticleList;
