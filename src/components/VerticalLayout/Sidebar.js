import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.svg"
import logoLight from "../../assets/images/logo-light.png"
import logoLightSvg from "../../assets/images/logo-light.svg"
import logoDark from "../../assets/images/logo-dark.png"
import routeNames from "../../routes/routeNames"

const Sidebar = props => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
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
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
