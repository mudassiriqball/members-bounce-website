import React, { useState } from 'react'
import { Button } from '..';
import axios from 'axios';
import { urls } from 'helpers';
import { convertFromDbToServerAlphabet } from 'helpers/dateUtility';
import { Col, Label, Row } from 'reactstrap';
import { Notifications } from 'helpers';
import { deleteNotification, markAsReadNotification } from 'hooks';
import routeNames from 'routes/routeNames';
import { Link } from 'react-router-dom';
import theme from 'constants/theme';
import Swal from 'sweetalert2';

const NotificationCard = props => {
  const { notification, token, user, history, from, reload, setReload } = props;
  const [deleteLoading, setLoading] = useState();
  const [markLoading, setMarkLoading] = useState(false);

  const handleDelete = () => {
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
        setLoading(true);
        const isDeleted = deleteNotification(token, user._id, notification._id);
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
        setLoading(false);
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    })
  }

  const handleMarkRead = () => {
    setMarkLoading(true);
    const marked = markAsReadNotification(token, user._id, notification._id);
    if (marked) {
      setReload(reload + 1);
    }
    setMarkLoading(false);
  }

  const handleNavigate = async () => {
    await markAsReadNotification(token, user._id, notification._id);
    if (notification.data.type === Notifications.PLAY_NOW) {
      await axios({
        method: 'GET',
        url: urls.PLAY_NOW_OFFER_BY_ID + notification.data.req_id,
        headers: {
          'authorization': token
        },
      }).then(res => {
        if (notification.data.sub_type === notifications.LISTING) {
          history.push({
            pathname: routeNames.Private.PlayNow_ViewAndRequest,
            item: res.data.data
          });
        } else if (notification.data.sub_type === Notifications.REQUEST) {
          history.push({
            pathname: routeNames.Private.PlayNow_ViewMatches,
            item: res.data.data
          });
        }
      }).catch(err => {
        console.log('error:', err);
        Swal.fire(
          'Error',
          'Something went wrong or requested data not found!',
          'error'
        )
      });
    } else if (notification.data.type === Notifications.RECIPROCAL_PLAY) {
      await axios({
        method: 'GET',
        url: urls.RECIPROCAL_PLAY_REQUEST_BY_ID + notification.data.req_id,
        headers: {
          'authorization': token
        },
      }).then(res => {
        if (notification.data.sub_type === Notifications.LISTING) {
          history.push({
            pathname: routeNames.Private.ReciprocalPlay_ViewAndRequest,
            item: res.data.data
          });
        } else if (notification.data.sub_type === Notifications.REQUEST) {
          history.push({
            pathname: routeNames.Private.ReciprocalPlay_ViewMatches,
            item: res.data.data
          });
        }
      }).catch(err => {
        console.log('error:', err);
        Swal.fire(
          'Error',
          'Something went wrong or requested data not found!',
          'error'
        )
      });
    }
  }

  return (
    <Row className='d-flex align-items-center' style={{ borderBottom: `1px solid lightgrey`, marginBottom: '10px', paddingBottom: '20px' }}>
      <Col lg='1' md='2' sm='2'>
        <i className="bx bx-bell bx-md text-danger" />
      </Col>
      <Col>
        <div className='d-flex flex-column'>
          <Label className='text-bold font-size-18'>{notification.title}</Label>
          <Label className='font-weight-normal'>{notification.body}</Label>
        </div>
      </Col>
      <Col lg='2' md='2' sm='2'>
        <Label>{convertFromDbToServerAlphabet(notification.entry_date)}</Label>
      </Col>
      <Col lg='2' md='2' sm='12'>
        <div className='d-flex flex-row justify-content-end ml-auto'>
          <Link onClick={() => handleNavigate()}>View</Link>
          <i
            onClick={() => handleDelete()}
            disabled={deleteLoading || markLoading}
            style={{ fontSize: '20px', marginRight: '20px', marginLeft: '20px' }}
            className="bx bx-trash text-danger cursor-pointer" />
          {from === 'unread' &&
            <i
              onClick={() => handleMarkRead()}
              disabled={deleteLoading || markLoading}
              style={{ fontSize: '25px' }}
              className="bx bx-check-double text-success cursor-pointer" />
          }
        </div>
      </Col>
    </Row>
  )
}

export default NotificationCard;
