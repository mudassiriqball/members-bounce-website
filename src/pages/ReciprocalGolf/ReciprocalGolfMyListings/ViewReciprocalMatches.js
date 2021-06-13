import React, { useRef, useState, useEffect } from 'react'
import { Breadcrumbs, Button, Loading, NoDataFound, RateAndReviewModel, ScrollView, UserDetailsCard } from 'components/Common'
import axios from 'axios';
import { sendNotification } from 'hooks';
import { MATCH_PENDING, MATCH_PLAYED, MATCH_STARTED, REQUEST_ACCEPTED, REQUEST_ACCEPTED_AND_PAID, REQUEST_DECLINED, REQUEST_PENDING } from 'helpers/requestStatus';
import { Notifications, urls } from 'helpers';
import theme from 'constants/theme';
import { Container } from 'reactstrap';
import { MetaTags } from 'react-meta-tags';
import { getBearerToken } from 'helpers/authentication';
import { authenticateUser } from 'store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const ViewReciprocalMatches = (props) => {
  const { user, history, authenticateUser } = props;
  const token = getBearerToken();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isHistory, setIsHistory] = useState(false);
  const [showRatingReviewModel, setShowRatingReviewModel] = useState(false);
  const [data, setData] = useState(null);
  const [acceptedCount, setAcceptedCount] = useState(0);

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  useEffect(() => {
    setRequests([]);
    if (props.route && props.route.params && props.route.params.item) {
      setItem(props.route.params.item);
      setLoading(true);
      getReciprocalPlayById(props.route.params.item._id);
      setIsHistory(props.route.params.history);
      props.route.params.item.requests.forEach(element => {
        if (element.status === REQUEST_ACCEPTED_AND_PAID) {
          setAcceptedCount(acceptedCount + 1);
        }
      });
    }
    return () => {}
  }, []);

  const getReciprocalPlayById = async (id) => {
    await axios({
      method: 'GET',
      url: urls.RECIPROCAL_PLAY_REQUEST_BY_ID + id,
      headers: {
        'authorization': token,
      },
    }).then(res => {
      setItem(res.data.data);
      res.data.data && res.data.data.requests && res.data.data.requests.forEach((element) => {
        getUserById(element);
      });
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log('getUserById  Error:', err);
    });
  }

  const getUserById = async (element) => {
    await axios({
      method: 'GET',
      url: urls.USER_BY_ID + element.user_id,
      headers: {
        'authorization': token,
      },
    }).then(res => {
      setRequests(prevState => [...prevState, { user: res.data.data, reqData: element }]);
    }).catch(err => {
      console.log('getUserById  Error:', err);
    });
  }

  // Handle Accept Request
  const handleAcceptRequest = async (element) => {
    Swal.fire({
      title: 'Are you sure?',
      text: ' You want to accept this  Reciprocal Play request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.LightThemeColors.RED,
      confirmButtonText: 'Yes, accept',
      cancelButtonColor: theme.LightThemeColors.SUCCESS,
      cancelButtonText: 'Cancel '
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await axios({
          method: 'PUT',
          url: urls.ACCEPT_REQUEST_RECIPROCAL_PLAY_REQUEST + item._id,
          headers: {
            'authorization': token
          },
          data: {
            req_id: element.reqData._id,
          }
        }).then(res => {
          setIsLoading(false);
          if (res.data.code == 202) {
            Swal.fire(
              'Error!',
              'Group deleted or is full!',
              'error'
            )
          } else if (res.data.code == 201) {
            Swal.fire(
              'Error!',
              'Group is full!',
              'error'
            )
          } else {
            sendNotification(
              token,
              element.user._id,
              user._id,
              Notifications.RECIPROCAL_PLAY_TITLE,
              Notifications.RECIPROCAL_PLAY_ACCEPTED_BODY,
              { req_id: item._id, type: Notifications.RECIPROCAL_PLAY, sub_type: Notifications.LISTING }
            );
            Swal.fire(
              'Success!',
              'Your request processed successfully',
              'success'
            )
          }
        }).catch(err => {
          console.log('handleAcceptRequest:', err);
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

  // Handle Decline Request
  const handleDeclineRequest = async (element) => {
    Swal.fire({
      title: 'Decline Reciprocal Play Request?',
      text: ' If you decline, The request will deleted permanently and can\'t be retrieved again?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.LightThemeColors.RED,
      confirmButtonText: 'Yes, accept',
      cancelButtonColor: theme.LightThemeColors.SUCCESS,
      cancelButtonText: 'Cancel '
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await axios({
          method: 'PUT',
          url: urls.DECLINE_REQUEST_RECIPROCAL_PLAY_REQUEST + item._id,
          headers: {
            'authorization': token
          },
          data: {
            req_id: element.reqData._id,
          }
        }).then(res => {
          setIsLoading(false);
          sendNotification(
            token,
            element.user._id,
            user._id,
            Notifications.RECIPROCAL_PLAY_TITLE,
            Notifications.RECIPROCAL_PLAY_DECLINED_BODY,
            { req_id: item._id, type: Notifications.RECIPROCAL_PLAY, sub_type: Notifications.LISTING }
          );
          Swal.fire(
            'Success!',
            'Your request processed successfully',
            'success'
          )
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

  // Set Match Started or Played
  const handleUpdateMatchStatus = async (status) => {
    Swal.fire({
      title: 'Are you sure?',
      text: ' You want to start the match.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.LightThemeColors.RED,
      confirmButtonText: 'Yes, accept',
      cancelButtonColor: theme.LightThemeColors.SUCCESS,
      cancelButtonText: 'Cancel '
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await axios({
          method: 'PUT',
          url: urls.UPDATE_RECIPROCAL_PLAY_MATCH_STATUS + item._id,
          headers: {
            'authorization': token
          },
          data: { status }
        }).then(res => {
          setIsLoading(false);
          item.requests.forEach(data => {
            if (data.status === REQUEST_ACCEPTED)
              sendNotification(
                token,
                data.user_id,
                user._id,
                Notifications.RECIPROCAL_PLAY_TITLE,
                status === MATCH_STARTED ?
                  Notifications.RECIPROCAL_PLAY_MATCH_STARTED_BODY
                  :
                  Notifications.RECIPROCAL_PLAY_MATCH_FINISHED_BODY,
                { req_id: item._id, type: Notifications.RECIPROCAL_PLAY, sub_type: Notifications.LISTING }
              );
          })
          Swal.fire(
            'Success!',
            'Your request processed successfully',
            'success'
          )
        }).catch(err => {
          console.log('handleDeleteMyOffer reciprocal err:', err);
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

  if (loading) {
    return <Loading />
  } else if (requests.length < 1) {
    return <NoDataFound />
  }

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>My Listings | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Play Now'}
            breadcrumbItem={'My Listings'}
          />
          <RateAndReviewModel
            visible={showRatingReviewModel}
            onHide={() => setShowRatingReviewModel(false)}
            data={data}
            user={user}
            token={token}
          />
          {requests.length < 1 && <NoDataFound />}
          {requests && requests.map((element, index) => (
            <UserDetailsCard
              key={index}
              user={user}
              element={element}
              item={item}
            >
              <div style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                {item && item.requests && item.requests[index] ?
                  !isHistory ?
                    <>
                      {(item.requests[index].status === REQUEST_PENDING || item.requests[index].status === REQUEST_DECLINED) ?
                        <Button
                          // width={(item.requests[index].status === REQUEST_PENDING || item.requests[index].status === REQUEST_ACCEPTED) ? '45%' : '100%'}
                          disabled={isLoading}
                          onClick={() => handleAcceptRequest(element)}
                        >Accept</Button>
                        :
                        item.requests[index].status === REQUEST_ACCEPTED_AND_PAID &&
                        <Button
                          disabled={user._id === element.user._id}
                          onClick={() => history.push({
                            pathname: routeNames.Private.Chat,
                            sender: user,
                            receiver: element.user
                          })}
                        >Chat</Button>
                      }
                      {(item.requests[index].status === REQUEST_PENDING || item.requests[index].status === REQUEST_ACCEPTED) &&
                        <Button
                          color='danger'
                          disabled={isLoading}
                          onClick={() => handleDeclineRequest(element)}
                        >Decline</Button>
                      }
                    </>
                    :
                    <>
                      <Button
                        color='success'
                        width={'45%'}
                        disabled={isLoading}
                        onClick={() => { setShowRatingReviewModel(true), setData(element.user) }}
                      >Rate & Review</Button>
                    </>
                  :
                  <></>
                }
              </div>
            </UserDetailsCard>
          )
          )}
          <div style={{ height: 20 }} />
          {acceptedCount > 0 ?
            item && item.status === MATCH_PENDING ?
              <Button
                width={'100%'}
                color='success'
                disabled={isLoading}
                onClick={() => handleUpdateMatchStatus(MATCH_STARTED)}
              >Start Match</Button> :
              item && item.status === MATCH_STARTED &&
              <Button
                color='success'
                disabled={isLoading}
                onClick={() => handleUpdateMatchStatus(MATCH_PLAYED)}
              >Set Match Played</Button>
            :
            null
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewReciprocalMatches));
