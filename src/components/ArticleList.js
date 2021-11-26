import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getAllArticles} from "../utils/api";
import ArticleTile from "./ArticleTile";
import Header from "./Header";
import SortForm from "./SortForm";

const ArticleList = ({topics}) => {
  // useParams takes the parameter from the end of the url to determine what to get from the api
  const {topic_slug} = useParams();
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch all articles from api based on nav link selection
  useEffect(() => {
    // reset loading each time a new thing is clicked otherwise it'll never bring up that feedback after the first time
    setIsLoading(true);
    if (!topic_slug) {
      // case if "All Articles"
      (async () => {
        try {
          const articleData = await getAllArticles();
          setAllArticles(articleData);
          // fetching finished, exit loading pattern
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      // case if topic name selection
      (async () => {
        try {
          const articleData = await getAllArticles(topic_slug);
          setAllArticles(articleData);
          // fetching finished, exit loading pattern
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [topic_slug]);

  // component render, loading pattern
  if (isLoading) return <p>loading ...</p>;
  if (!topic_slug) {
    // creating article tiles, case if "All Topics"
    return (
      <div className="articleList">
        <Header headerText="All Topics" />
        <SortForm setAllArticles={setAllArticles} topic_slug={topic_slug} />
        <ArticleTile
          allArticles={allArticles}
          setAllArticles={setAllArticles}
        />
      </div>
    );
  } else {
    // self-searches topics based on topic_slug to get info to fill subheader
    const topicObj = topics.find((topic) => {
      return topic.slug === topic_slug;
    });
    // nb. could just assign straight away, but theoretically you might run into issues of a topic returning after articles
    // async is only 'synchronous' in its own scope so it allegedly _could_ happen
    let topicDescription = "";
    if (topicObj) topicDescription = topicObj.description;

    return (
      // creating article tiles, case if an individual topic is chosen
      <div className="articleList">
        <Header headerText={topic_slug} subHeaderText={topicDescription} />
        <SortForm setAllArticles={setAllArticles} />
        <ArticleTile allArticles={allArticles} />
      </div>
    );
  }
};

export default ArticleList;
