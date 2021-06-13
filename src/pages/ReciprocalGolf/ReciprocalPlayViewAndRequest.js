import React, { useState, useEffect } from 'react'
import { ConfirmPlayNowRequestModal, Loading, ReciprocalPlayCard, UserDetailsCard } from 'components/Common'
import axios from 'axios';
import { getMembersOnlyClubs, getUserById, sendNotification } from 'hooks';
import { Notifications, urls } from 'helpers';
import Swal from 'sweetalert2';
import { getBearerToken } from 'helpers/authentication';

import Breadcrumbs from "../../components/Common/Breadcrumb"
import { authenticateUser } from 'store/actions';
import { MetaTags } from 'react-meta-tags';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const ReciprocalPlayViewAndRequest = (props) => {
  const { user, history } = props;
  const token = getBearerToken();
  const { MEMBERS_ONLY_CLUBS } = getMembersOnlyClubs();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { IS_LOADING, USER } = getUserById(token, item && item.user_id);
  const [showConfirmRequestModel, setShowConfirmRequestModel] = useState(false);

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  useEffect(() => {
    if (window.location && window.location.item) {
      setItem(window.location.item);
    }
    return () => {}
  }, []);

  // Request To Play
  const handleRequestToPlay = async (mobile) => {
    setIsLoading(true);
    await axios({
      method: 'PUT',
      url: urls.REQUEST_RECIPROCAL_REQUEST + item._id,
      headers: {
        'authorization': token
      },
      data: {
        user_id: user._id,
        mobile: mobile
      }
    }).then(res => {
      setIsLoading(false);
      if (res.data.code == 202) {
        Swal.fire(
          'Error',
          'Request deleted or group is full!',
          'error'
        )
      } else {
        // TODO: refresh issue
        Swal.fire(
          'Success!',
          'Your request processed successfully',
          'success'
        )
        sendNotification(
          token,
          item.user_id,
          user._id,
          Notifications.RECIPROCAL_PLAY_TITLE,
          Notifications.RECIPROCAL_PLAY_NEW_REQUEST_BODY,
          { req_id: item._id, type: Notifications.RECIPROCAL_PLAY, sub_type: Notifications.REQUEST, }
        );
      }
    }).catch(err => {
      console.log('ernnr:', err);
      setIsLoading(false);
      Swal.fire(
        'Error',
        'Request deleted or group is full!',
        'error'
      )
    });
  }

  // Delete My Request
  const handleDeleteRequest = async () => {
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
        setIsLoading(true);
        await axios({
          method: 'PUT',
          url: urls.DELETE_RECIPROCAL_PLAY_REQUEST + item._id,
          headers: {
            'authorization': token
          },
          data: {
            user_id: user._id,
          }
        }).then(res => {
          setIsLoading(false);
          // TODO: refresh issue
          Swal.fire(
            'Success!',
            'Your request processed successfully',
            'success'
          )
          sendNotification(
            token, item.user_id,
            user._id, Notifications.RECIPROCAL_PLAY_TITLE,
            Notifications.RECIPROCAL_PLAY_REQUEST_DELETED_BODY,
            { req_id: item._id, type: Notifications.RECIPROCAL_PLAY, sub_type: Notifications.REQUEST, }
          );
        }).catch(err => {
          console.log('ernnr:', err);
          setIsLoading(false);
          Swal.fire(
            'Error',
            'Something went wrong, Please try again later!',
            'error'
          )
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    });
  }

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>View & Request | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Reciprocl Golf'}
            breadcrumbItem={'View & Request'}
          />
          <ConfirmPlayNowRequestModal
            visible={showConfirmRequestModel}
            onHide={() => setShowConfirmRequestModel(false)}
            user={user}
            onConfirm={handleRequestToPlay}
          />
          {IS_LOADING ? <Loading />
            :
            <Row>
              <Col lg={6} md={6} sm={12} className='d-grid align-items-stretch'>
                <UserDetailsCard
                  user={user}
                  element={USER}
                />
              </Col>
              <Col lg={6} md={6} sm={12} className='d-grid align-items-stretch'>
                <ReciprocalPlayCard
                  item={item}
                  user={user}
                  browserHistory={history}
                  from={'viewAndRequest'}
                  loading={isLoading}
                  disabled={isLoading || user._id === item && item.user_id}
                  onClick={() => {
                    const found = MEMBERS_ONLY_CLUBS && MEMBERS_ONLY_CLUBS.filter((element) => {
                      if (item.course === element.course) {
                        return true;
                      }
                    });
                    if (found && found.length > 0 && user.level < 2) {
                      Swal.fire(
                        'Access Denied',
                        'Sorry you can not request for members only club, Only users with level 2 can access them, upgrade your account to access.',
                        'error'
                      )
                    } else {
                      setShowConfirmRequestModel(true);
                    }
                  }
                  }
                  onDelete={() => handleDeleteRequest()}
                />
              </Col>
            </Row>
          }
        </Container>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
  authenticateUser
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReciprocalPlayViewAndRequest));
