import { NavLink } from "react-router-dom";

const NavLinks = (props) => {
  const links = ["picasso", "beaches", "nature"].map((query) => {
    return (
      <li key={query + "1"}>
        <NavLink
          to={`/${query}`}
          onClick={() => {
            props.fetchData(query);
          }}
        >
          {query}
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="main-nav">
      <ul>{links}</ul>
    </nav>
  );
};

export default NavLinks;
