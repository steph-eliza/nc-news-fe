import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getArticles} from "../utils/api";
import Header from "./Header";
import SortForm from "./SortForm";

const ArticleList = ({topics}) => {
  // takes the parameter from the end of the url
  const {topic_slug} = useParams();
  console.log(topic_slug, "       <-- topicslug in articles");
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

          console.log(
            articleData,
            "        <-- articleData return in useEffect"
          );
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

          console.log(
            articleData,
            "        <-- articleData return in useEffect"
          );
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [topic_slug]);

  console.log(allArticles, "        <-- allArticles after GET");

  if (isLoading) return <p>loading ...</p>;
  // page return
  if (!topic_slug) {
    // populate in case of no filtering
    return (
      <div>
        <Header headerText="All Topics" />
        {/* add description h2 */}
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
    return (
      // populate in case of a specific picked topic
      <div className="articleList">
        <Header headerText={topic_slug} subHeaderText={topics.description} />
        {/* add description h2 */}
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
        <p></p>
      </div>
    );
  }
};

export default ArticleList;
