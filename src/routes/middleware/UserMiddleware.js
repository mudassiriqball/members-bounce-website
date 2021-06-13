import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import routeNames from "../routeNames"

const UserMiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  history,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!localStorage.getItem("accessToken")) {
        return (
          <Redirect
            to={{ pathname: routeNames.Home, state: { from: props.location } }}
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

export default UserMiddleware;
