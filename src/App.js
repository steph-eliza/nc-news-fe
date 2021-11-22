import {Route, Routes} from "react-router";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import Nav from "./components/Nav.js";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/articles" element={ArticleList} />
        <Route path="/articles/:article_id" element={ArticlePage} />
      </Routes>
    </div>
  );
}

export default App;
