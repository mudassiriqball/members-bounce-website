import PropTypes from 'prop-types'
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import {
  changeTopbarTheme,
  changeLayout,
} from "../../store/actions"

// Other AppLayout related Component
import Navbar from "./Navbar"
import Header from "./Header"
import Footer from "./Footer"
import Rightbar from "../CommonForBoth/RightSidebar"

class AppLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpened: false,
    }
  }

  componentDidMount() {
    this.props.changeLayout('horizontal');
    if (this.props.isPreloader === true) {
      document.getElementById("preloader").style.display = "block"
      document.getElementById("status").style.display = "block"

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none"
        document.getElementById("status").style.display = "none"
      }, 2500)
    } else {
      document.getElementById("preloader").style.display = "none"
      document.getElementById("status").style.display = "none"
    }

    // Scrollto 0,0
    window.scrollTo(0, 0)

    const title = this.props.location.pathname
    let currentage = title.charAt(1).toUpperCase() + title.slice(2)

    document.title =
      currentage + " | Skote - React Admin & Dashboard Template"

    if (this.props.topbarTheme) {
      this.props.changeTopbarTheme(this.props.topbarTheme)
    }
  }

  /**
   * Opens the menu - mobile
   */
  openMenu = () => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened })
  }

  render() {
    return (
      <>
        <div id="preloader">
          <div id="status">
            <div className="spinner-chase">
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
            </div>
          </div>
        </div>

        <div id="layout-wrapper">
          <Header
            theme={this.props.topbarTheme}
            isMenuOpened={this.state.isMenuOpened}
            openLeftMenuCallBack={this.openMenu}
            history={this.props.history}
          />
          <Navbar menuOpen={this.state.isMenuOpened} />
          <div className="main-content">{this.props.children}</div>
          <Footer />
        </div>

        {this.props.showRightSidebar ? <Rightbar hideOptions={true} /> : null}
      </>
    )
  }
}

const mapStatetoProps = state => {
  return {
    ...state.AppLayout,
  }
}
export default connect(mapStatetoProps, {
  changeLayout,
  changeTopbarTheme,
})(withRouter(AppLayout))
