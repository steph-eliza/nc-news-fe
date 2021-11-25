const Header = ({headerText, subHeaderText = ""}) => {
  return (
    <div>
      <h1>{headerText}</h1>
      <h2>{subHeaderText}</h2>
    </div>
  );
};

export default Header;
