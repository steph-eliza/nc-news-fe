import {Link} from "react-router-dom";
import {useState} from "react";

const Nav = () => {
  return (
    <nav>
      <Link to="/articles">All</Link>
    </nav>
  );
};

export default Nav;
