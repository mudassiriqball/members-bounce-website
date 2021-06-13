import React, { useState } from 'react'
import { deleteAllNotifications, getAllNotifications, markAllAsReadNotification, markAsReadNotification } from 'hooks';
import { Button, Loading, NoDataFound, NotificationCard } from 'components/Common';
import { Col, Row, Card, CardBody } from 'reactstrap';
import Swal from 'sweetalert2';
import theme from 'constants/theme';

const ReadNotifications = props => {
  const { token, user, history, reload, setReload, IS_LOADING, NOTIFICATIONS } = props;
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const [markAllReadLoading, setMarkAllReadLoading] = useState(false);

  if (IS_LOADING) {
    return <Loading />
  } else if (NOTIFICATIONS.length < 1) {
    return <NoDataFound />
  }

  const handleAllDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.LightThemeColors.RED,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: theme.LightThemeColors.SUCCESS,
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeleteAllLoading(true);
        const isDeleted = deleteAllNotifications(token, user._id, true);
        if (isDeleted) {
          setReload(reload + 1);
          Swal.fire(
            'Deleted!',
            'Your request processed successfully',
            'success'
          )
        } else {
          Swal.fire(
            'Error',
            'Something went wrong, Please try again later!',
            'error'
          )
        }
        setDeleteAllLoading(false);
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    });
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col></Col>
          <Col>
            <Button
              color={'danger'}
              onClick={() => handleAllDelete()}
              loading={deleteAllLoading}
              disabled={deleteAllLoading || markAllReadLoading}
            >Delete All</Button>
          </Col>
        </Row>
        <hr />
        {NOTIFICATIONS && NOTIFICATIONS.map((item, index) => (
          <Col lg='12' key={index}>
            <NotificationCard
              notification={item}
              user={user}
              history={history}
              from='read'
              token={token}
              setReload={setReload}
              reload={reload}
            />
          </Col>
        ))}
      </CardBody>
    </Card>
  )
}

export default ReadNotifications;
