import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import SendIcon from 'mdi-react/LoginIcon';

import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarNav from './tobar_nav/TopbarNav';
import ROUTES from '../../../constants/Routes';
import logo from 'assets/img/logo.png';


export default class TopbarWithNavigation extends PureComponent {

  render() {
    const { changeMobileSidebarVisibility } = this.props;

    return (
      <div className="topbar topbar--navigation">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton changeMobileSidebarVisibility={changeMobileSidebarVisibility} />
            <a className="topbar__logo d-none d-lg-block " href={`${ROUTES.INDEX}#`}>
              <img src={logo} alt="" className="logo topbar__button-icon" />
            </a>
            <a className="topbar__log my-auto text-white d-none d-md-block" href={`${ROUTES.INDEX}#`}>
              Adhyaya Educational Services
            </a>
          </div>
          <TopbarNav />
          <div className="topbar__right">
            <Link className="topbar__nav-link bg-white" to={ROUTES.LOGIN}>
              <div className="icon icon--right" color="primary" outline="true" >
                <p><SendIcon /> Login</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
