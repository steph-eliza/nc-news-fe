import {useEffect} from "react";
import {useParams} from "react-router";
import {useState} from "react/cjs/react.development";
import {getArticleContent} from "../utils/api";
import CommentTile from "./CommentTile";
import Header from "./Header";
import PostForm from "./PostForm";
import Votes from "./Votes";

const ArticlePage = () => {
  const {article_id} = useParams();
  const [articleData, setArticleData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const articleContent = await getArticleContent(article_id);
      console.log(articleContent);
      setArticleData(articleContent);
      setIsLoading(false);
    })();
  }, [article_id]);

  if (isLoading) return <p>loading ...</p>;
  return (
    <div>
      <Header headerText={articleData.title} />
      <p>By: {articleData.author}</p>
      <p>Posted: {articleData.created_at}</p>
      <p>{articleData.body}</p>
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
