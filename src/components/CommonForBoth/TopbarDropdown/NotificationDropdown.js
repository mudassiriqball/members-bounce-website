import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"


import { fetchNotificationAction } from 'store/actions';
import { connect } from "react-redux"
import routeNames from "routes/routeNames";
import { convertFromDbToServerAlphabet } from "helpers/dateUtility";

const NotificationDropdown = props => {
  const { user, success, error, notifications, fetchNotificationAction } = props;
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [unReadNotifications, setUnReadNotifications] = useState([]);

  useEffect(() => {
    if (!notifications) {
      fetchNotificationAction();
    }
  }, []);

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      setUnReadNotifications(notifications.filter(element => element.read === false));
    }
    return () => {
    }
  }, [notifications])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">{unReadNotifications.length || 0}</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {"Notifications"} </h6>
              </Col>
              <div className="col-auto">
                <a href={routeNames.Private.Notifications} className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {unReadNotifications && unReadNotifications.map((element, index) => (
              <Link to={routeNames.Private.Notifications} key={index} className="text-reset notification-item">
                <div className="media">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="bx bx-bell" />
                    </span>
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">
                      {element.title}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">
                        {element.body}
                      </p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {convertFromDbToServerAlphabet(element.entry_date)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
            }
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to={routeNames.Private.Notifications}
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              {"View all"}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}


const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  const { notifications, success, error } = state.Notifications;
  return { isLoggedIn, user, notifications, success, error }
}
const mapDispatchToProps = {
  fetchNotificationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDropdown);