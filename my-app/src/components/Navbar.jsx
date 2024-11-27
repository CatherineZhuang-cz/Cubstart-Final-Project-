import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TRIVIA TAP</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/music">MUSIC</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">HISTORY</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">BOOKS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/film">FILM</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/anime">ANIME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/theatres">THEATRES</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link" to="/quiz">RANDOM</Link>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn0">Score</button>
            <button className="btn1 mx-2">Login</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
