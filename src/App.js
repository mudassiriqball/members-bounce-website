import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import "./assets/scss/my_custom.scss"

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper"

// import fakeBackend from "./helpers/AuthType/fakeBackend"
import AppLayout from './components/AppLayout'
import { authenticateUser } from './store/actions';
import routeNames from './routes/routeNames'

// Activating fake backend
// fakeBackend()

const firebaseConfig = {
  apiKey: "AIzaSyDfhe0w6m7yUZgkgdP5pIyYVj0nwoxbKLs",
  authDomain: "members-bounce-abe10.firebaseapp.com",
  projectId: "members-bounce-abe10",
  storageBucket: "members-bounce-abe10.appspot.com",
  messagingSenderId: "517239518560",
  appId: "1:517239518560:web:c5fd323152d84a3ba81a05",
  measurementId: "G-Q76FGHKK2G",
  databaseURL: "https://members-bounce-abe10-default-rtdb.firebaseio.com/"
};

// init firebase backend
initFirebaseBackend(firebaseConfig);

const App = props => {
  const { authenticateUser, history } = props;

  useEffect(() => {
    authenticateUser();
  }, []);

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              // TODO: Replace it with some better logic
              layout={(route.path === routeNames.Home || route.path === routeNames.AboutUs || route.path === routeNames.ContactUs ||
                route.path === routeNames.Events || route.path === routeNames.Membership) ? AppLayout : NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
              history={history}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
              history={history}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, { authenticateUser })(App);
