import {Route, Routes} from "react-router";
import {useState} from "react/cjs/react.development";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import Nav from "./components/Nav.js";

function App() {
  const [topics, setTopics] = useState([]);

  return (
    <div className="App">
      <Nav topics={topics} setTopics={setTopics} />
      <Routes>
        <Route path="/" element={<ArticleList topics={topics} />} />
        <Route path="/articles" element={<ArticleList topics={topics} />} />
        <Route
          path="/articles/:topic_slug"
          element={<ArticleList topics={topics} />}
        />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
