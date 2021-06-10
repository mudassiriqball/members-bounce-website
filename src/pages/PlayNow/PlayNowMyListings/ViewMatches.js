import React, { useRef, useState, useEffect } from 'react'
import { Breadcrumbs, Button, Loading, NoDataFound, RateAndReviewModel, UserDetailsCard } from 'components/Common'
import axios from 'axios';
import { urls, Notifications } from 'helpers';
import { sendNotification } from 'hooks';
import {
  MATCH_PLAYED, MATCH_PENDING, REQUEST_ACCEPTED,
  MATCH_STARTED, REQUEST_DECLINED, REQUEST_DELETED, REQUEST_PENDING, REQUEST_ACCEPTED_AND_PAID
} from 'helpers/requestStatus';
import { MetaTags } from 'react-meta-tags';
import { Container, Row, Col, Label } from "reactstrap";

export default function ViewMatches(props) {
  const { user, token, navigation } = props;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [isHistory, setIsHistory] = useState(false);
  const [showRatingReviewModel, setShowRatingReviewModel] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setRequests([]);
    if (props.route && props.route.params && props.route.params.item) {
      setItem(props.route.params.item);
      setLoading(true);
      getPlayNowOfferById(props.route.params.item._id);
      props.route.params.item.requests.forEach(element => {
        if (element.status === REQUEST_ACCEPTED_AND_PAID) {
          setAcceptedCount(acceptedCount + 1);
        }
      });
      setIsHistory(props.route.params.history);
    }

    return () => {}
  }, []);

  const getPlayNowOfferById = async (id) => {
    await axios({
      method: 'GET',
      url: urls.PLAY_NOW_OFFER_BY_ID + id,
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
    alert(
      'Accept Play Now Request?',
      'Are you sure you want to accept this offer?',
      [
        { text: "Cancel", style: 'cancel', onClick: () => {} },
        {
          text: 'Confirm',
          style: 'default',
          onClick: async () => {
            setIsLoading(true);
            await axios({
              method: 'PUT',
              url: urls.ACCEPT_REQUEST_PLAY_NOW_OFFER + item._id,
              headers: {
                'authorization': token
              },
              data: {
                size: item.size,
                req_id: element.reqData._id,
                homeClub: true,
              }
            }).then(res => {
              setIsLoading(false);
              if (res.data.code == 202) {
                // toastRef && toastRef.current && toastRef.current.show('Group deleted or full!', CONSTS.TOAST_MEDIUM_DURATION, () => {});
              } else if (res.data.code == 201) {
                // toastRef && toastRef.current && toastRef.current.show('Group is full !', CONSTS.TOAST_MEDIUM_DURATION, () => {});
              } else {
                sendNotification(
                  token,
                  element.user._id,
                  user._id,
                  Notifications.PLAY_NOW_TITLE,
                  Notifications.PLAY_NOW_ACCEPTED_BODY,
                  { req_id: item._id, type: Notifications.PLAY_NOW, sub_type: Notifications.LISTING }
                );
                // toastRef && toastRef.current && toastRef.current.show('Your request was processed successfully.', CONSTS.TOAST_MEDIUM_DURATION, () => {
                //   navigation.navigate('Members');
                // });
              }
            }).catch(err => {
              console.log('handleAcceptRequest:', err);
              setIsLoading(false);
              // toastRef && toastRef.current && toastRef.current.show('Something wents wrong, Please try again later!', CONSTS.TOAST_MEDIUM_DURATION, () => {});
            });
          },
        },
      ]
    );
  }

  // Handle Decline Request
  const handleDeclineRequest = async (element) => {
    alert(
      'Decline Play Now Request?',
      'If you decline, The request will deleted permanently and can\'t be reterived again?',
      [
        { text: "Cancel", style: 'cancel', onClick: () => {} },
        {
          text: 'Confirm',
          style: 'default',
          onClick: async () => {
            setIsLoading(true);
            await axios({
              method: 'PUT',
              url: urls.DECLINE_REQUEST_PLAY_NOW_OFFER + item._id,
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
                Notifications.PLAY_NOW_TITLE,
                Notifications.PLAY_NOW_DECLINED_BODY,
                { req_id: item._id, type: Notifications.PLAY_NOW, sub_type: Notifications.LISTING }
              );
              // toastRef && toastRef.current && toastRef.current.show('Your request was processed successfully.', CONSTS.TOAST_MEDIUM_DURATION, () => {
              //   navigation.navigate('Members');
              // });
            }).catch(err => {
              console.log('ernnr:', err);
              setIsLoading(false);
              // toastRef && toastRef.current && toastRef.current.show('Something wents wrong, Please try again later!', CONSTS.TOAST_MEDIUM_DURATION, () => {});
            });
          },
        },
      ]
    );
  }

  // Set Match Started or Played
  const handleUpdateMatchStatus = async (status) => {
    alert(
      'Warning',
      'Are you sure?',
      [
        {
          text: "Cancel", style: 'cancel', onClick: () => {}
        },
        {
          text: "Confirm", style: 'destructive', onClick: async () => {
            setIsLoading(true);
            await axios({
              method: 'PUT',
              url: urls.UPDATE_PLAY_NOW_MATCH_STATUS + item._id,
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
                    Notifications.PLAY_NOW_TITLE,
                    status === MATCH_STARTED ?
                      Notifications.PLAY_NOW_MATCH_STARTED_BODY
                      :
                      Notifications.PLAY_NOW_MATCH_FINISHED_BODY,
                    { req_id: item._id, type: Notifications.PLAY_NOW, sub_type: Notifications.LISTING }
                  );
              });
              // toastRef.current.show('Your request was processed successfully.', CONSTS.TOAST_MEDIUM_DURATION, () => {
              //   navigation.navigate('Members');
              // });
            }).catch(err => {
              console.log('handleDeleteMyOffer err:', err);
              setIsLoading(false);
              // toastRef.current.show('Something went wrong, Please try again later!', CONSTS.TOAST_MEDIUM_DURATION, () => {
              // });
            });
          }
        },
      ]
    );
  }

  if (loading) {
    return <Loading />
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
          {requests && requests.map((element, index) =>
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
                      {(item.requests[index].status === REQUEST_PENDING || item.requests[index].status === REQUEST_DECLINED) &&
                        <Button
                          disabled={isLoading}
                          onClick={() => handleAcceptRequest(element)}
                        >Accept</Button>
                      }
                      {item.requests[index].status === REQUEST_ACCEPTED_AND_PAID &&
                        <Button
                          disabled={user._id === element.user._id}
                          onClick={() => navigation.navigate('ChatScreen', { sender: user, receiver: element.user })}
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
                        disabled={isLoading}
                        onClick={() => { setShowRatingReviewModel(true), setData(element.user) }}
                      >Rate & Review</Button>
                    </>
                  :
                  <></>
                }
              </div>
            </UserDetailsCard>
          )}
          <div style={{ height: 20 }} />
          {acceptedCount > 0 ?
            item && item.status === MATCH_PENDING ?
              <Button
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