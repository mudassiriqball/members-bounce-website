import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import routeNames from "../../routes/routeNames"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  history,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.getItem("accessToken") && props.location.pathname !== '/logout') {
        return (
          <Redirect
            to={{ pathname: routeNames.Private.Dashboard, state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout history={history}>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
