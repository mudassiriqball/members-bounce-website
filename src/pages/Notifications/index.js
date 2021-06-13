import React, { useState, useEffect } from 'react'
import UnReadNotifications from './UnReadNotifications';
import ReadNotifications from './ReadNotifications';
import { connect } from 'react-redux';
import { getBearerToken } from 'helpers/authentication';
import { authenticateUser, fetchNotificationAction } from 'store/actions';
import { Breadcrumbs } from 'components/Common';
import { MetaTags } from 'react-meta-tags';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const Notifications = props => {
  const { user, success, error, notifications, loading, fetchNotificationAction } = props;
  const token = getBearerToken();
  const [reload, setReload] = useState(0);
  const [readNotifications, setReadNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [isTabOne, setIsTabOne] = useState(true);

  useEffect(() => {
    if (!notifications) {
      fetchNotificationAction();
    }
    if (!user) {
      authenticateUser();
    }
  }, []);

  useEffect(() => {
    if (notifications) {
      let readArr = [];
      let unReadArr = [];
      notifications && notifications.forEach(item => {
        if (item.read) {
          readArr.push(item);
        } else {
          unReadArr.push(item);
        }
      });
      setReadNotifications(readArr);
      setUnreadNotifications(unReadArr);
    }
  }, [notifications]);

  useEffect(() => {
    if (reload > 0) {
      fetchNotificationAction();
    }
  }, [reload]);

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>Notifications | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Notifications'}
            breadcrumbItem={'Notifications'}
          />
          <Card>
            <CardBody className='p-0'>
              <Row className='p-0 m-0'>
                <Col onClick={() => setIsTabOne(true)} className={isTabOne ? 'bg-primary tab-col text-white' : 'bg-white tab-col'}>Unread</Col>
                <Col onClick={() => setIsTabOne(false)} className={!isTabOne ? 'bg-primary tab-col text-white' : 'bg-white tab-col'}>Read</Col>
              </Row>
            </CardBody>
          </Card>
          {isTabOne ?
            <UnReadNotifications
              {...props}
              reload={reload}
              token={token}
              setReload={setReload}
              IS_LOADING={loading}
              NOTIFICATIONS={unreadNotifications}
            />
            :
            <ReadNotifications
              {...props}
              reload={reload}
              token={token}
              setReload={setReload}
              IS_LOADING={loading}
              NOTIFICATIONS={readNotifications}
            />
          }
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  const { notifications, success, error, loading } = state.Notifications;
  return { isLoggedIn, user, notifications, success, error, loading }
}
const mapDispatchToProps = {
  fetchNotificationAction,
  authenticateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);