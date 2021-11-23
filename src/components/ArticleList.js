import {useParams} from "react-router";
import Header from "./Header";

const ArticleList = () => {
  const {topic_slug} = useParams();

  if (!topic_slug) {
    console.log("hello");
    return (
      <div>
        <Header headerText="All Topics" />
      </div>
    );
  }
  return (
    <div>
      <Header headerText={topic_slug} />
    </div>
  );
};

export default ArticleList;
