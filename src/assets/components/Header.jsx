import { Link } from "react-router-dom";

const Header = () => {
  const links = [
    { text: "Home", href: "/home" },
    { text: "Booking", href: "/booking" },
    { text: "Cancel Booking", href: "/cancelation-form" },
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            BookingApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              {links.map((link, index) => {
                const liElement = (
                  <li className="nav-item" key={index}>
                    <Link className="nav-link" to={link.href}>
                      {link.text}
                    </Link>
                  </li>
                );
                return liElement;
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
