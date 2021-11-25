import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://notably-niche-nc-news-nexus.herokuapp.com/api/",
});

export const getTopics = async () => {
  const res = await newsApi.get("/topics");
  return res.data.topics;
};

export const getAllArticles = async (topic, sort_by, order) => {
  if (!topic && !sort_by && !order) {
    const res = await newsApi.get("/articles");
    return res.data.allArticles;
  } else {
    const topicQuery = topic ? `topic=${topic}` : "";
    const sortQuery = sort_by ? `&sort_by=${sort_by}` : "";
    const orderQuery = order ? `&order=${order}` : "";

    const res = await newsApi.get(
      `/articles?${topicQuery}${sortQuery}${orderQuery}`
    );
    return res.data.allArticles;
  }
};

export const getArticlesButSimpler = (topic, sort_by, order) => {
  return newsApi.get("/articles").then((res) => {
    console.log(res);
    return res.data.allArticles;
  });
};

export const getArticleContent = async (articleID) => {
  const res = await newsApi.get(`/articles/${articleID}`);
  console.log(res);
  return res.data.article;
};

export const postUpdateVotes = async (articleID, votesToChange) => {
  const voteChange = {incVotes: votesToChange};

  const res = await newsApi.post(`/articles/${articleID}`, voteChange);
  return res.data.id;
};
