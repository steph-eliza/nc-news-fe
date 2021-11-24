const Header = ({headerText, subHeaderText}) => {
  console.log(headerText, "        <-- articleList Header");
  return (
    <div>
      <h1>{headerText}</h1>
      <h2>{subHeaderText ? subHeaderText : ""}</h2>
    </div>
  );
};

export default Header;
