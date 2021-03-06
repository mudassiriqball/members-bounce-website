import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import ReactDrawer from 'react-drawer';

import { connect } from "react-redux"

import { Link } from "react-router-dom"

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions"
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import RightSidebar from "../CommonForBoth/RightSidebar"

import megamenuImg from "../../assets/images/megamenu-img.png"
import logo from "../../assets/images/logo.svg"
import logoLight from "../../assets/images/logo-light.png"
import logoLightSvg from "../../assets/images/logo-light.svg"
import logoDark from "../../assets/images/logo-dark.png"
import { authenticateUser } from 'store/actions';

// Components
import Button from '../Common/Button';

//i18n
import { withTranslation } from "react-i18next"
import routeNames from "../../routes/routeNames";

const Header = props => {
  const { isLoggedIn, user, history, authenticateUser } = props;

  const [menu, setMenu] = useState(false)
  const [isSearch, setSearch] = useState(false)
  const [socialDrp, setsocialDrp] = useState(false)
  const [position, setPosition] = useState('right');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  const toggleTopDrawer = () => {
    setOpen(!open)
  }

  const onDrawerClose = () => {
    setOpen(false);
  }

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  console.log(isLoggedIn, user)


  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to={routeNames.Home} className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoDark} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="40" />
                </span>
              </Link>

              <Link to={routeNames.Home} className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLight} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="40" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu)
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>

          <div className="d-flex">
            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                className="btn header-item noti-icon "
                onClick={() => {
                  toggleFullscreen()
                }}
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            {isLoggedIn ?
              <React.Fragment>
                <NotificationDropdown />
                <ProfileMenu />
              </React.Fragment>
              :
              <React.Fragment>
                <div className="d-flex align-items-center m-2">
                  <Button onClick={() => history.push('/register')}>Join Now</Button>
                </div>
                <div className="d-flex align-items-center m-2">
                  <Button onClick={() => history.push('/login')}>Login</Button>
                </div>
              </React.Fragment>
            }

            <div className="dropdown d-inline-block">
              <button
                onClick={toggleTopDrawer}
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div>
          </div>
        </div>
      </header>
      {open && <ReactDrawer
        open={open}
        position={position}
        onClose={onDrawerClose}
      >
        <RightSidebar onClose={onDrawerClose} />
      </ReactDrawer>
      }
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  const { isLoggedIn, user } = state.User;
  return { layoutType, showRightSidebar, leftMenu, isLoggedIn, user }
}

export default connect(mapStateToProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  authenticateUser,
})(withTranslation()(Header))
