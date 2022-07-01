import { NavLink, Outlet } from "react-router-dom";

const NavLinks = () => {
  const links = ["picasso", "beaches", "nature"].map((query) => {
    return (
      <li key={query + "1"}>
        <NavLink to={`/${query}`}>{query}</NavLink>
      </li>
    );
  });

  return (
    <nav className="main-nav">
      <ul>{links}</ul>
      <Outlet />
    </nav>
  );
};

export default NavLinks;
