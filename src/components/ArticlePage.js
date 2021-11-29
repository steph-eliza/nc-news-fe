import {useEffect} from "react";
import {useParams} from "react-router";
import {useState} from "react";
import {getArticleContent} from "../utils/api";
import CommentTile from "./CommentTile";
import Header from "./Header";
import PostForm from "./PostForm";
import Votes from "./Votes";

const ArticlePage = () => {
  // useParams takes the parameter from the end of the url to determine what to get from the api
  const {article_id} = useParams();
  const [articleData, setArticleData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // api request based on param in url, exits loading pattern on completion
  useEffect(() => {
    (async () => {
      const articleContent = await getArticleContent(article_id);
      setArticleData(articleContent);
      setIsLoading(false);
    })();
  }, [article_id]);

  // loading pattern check and component render
  if (isLoading) return <p>loading ...</p>;
  return (
    <div className="articlePage">
      <Header headerText={articleData.title} />
      <span className="articleSubHeader">
        <p>By: {articleData.author}</p>
        <p>In: {articleData.topic}</p>
        <p>Posted: {articleData.created_at}</p>
      </span>
      <p className="messageBody">{articleData.body}</p>
      <Votes votesOnArticle={articleData.votes} article_id={article_id} />
      <PostForm article_id={article_id} setCommentData={setCommentData} />
      <CommentTile
        article_id={article_id}
        commentData={commentData}
        setCommentData={setCommentData}
      />
    </div>
  );
};

export default ArticlePage;
