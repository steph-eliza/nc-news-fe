import {Link} from "react-router-dom";
import {useState} from "react";

const Nav = () => {
  return (
    <nav>
      <Link to="/articles">All</Link>
      <Link to="/articles/coding">Coding</Link>
      <Link to="/articles/football">Football</Link>
      <Link to="/articles/cooking">Cooking</Link>
    </nav>
  );
};

export default Nav;
