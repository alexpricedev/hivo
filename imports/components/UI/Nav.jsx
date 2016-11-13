import React from 'react';
import { Link } from 'react-router';

import AccountsUIWrapper from '../Accounts/AccountsUIWrapper';

const Nav = () => (
  <nav className="pt-navbar pt-dark">
    <div className="pt-navbar-group pt-align-left">
      <div className="pt-navbar-heading">Hivo</div>
      <div className="pt-navbar-group pt-align-left">
        <AccountsUIWrapper />
      </div>
    </div>
    <div className="pt-navbar-group pt-align-right">
      <Link to="/" className="pt-button pt-minimal pt-icon-home">
        Home
      </Link>
      <Link
        to="daily"
        className="pt-button pt-minimal pt-icon-automatic-updates"
      >
        Daily entires
      </Link>
    </div>
  </nav>
);

export default Nav;
