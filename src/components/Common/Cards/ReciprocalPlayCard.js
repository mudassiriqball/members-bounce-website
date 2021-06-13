import React, { useEffect, useState } from 'react'
import { Button, renderLine } from '..';
import { getMatchStatusColor, getMatchStatusText, getRequestStatusColor, getRequestStatusText, MATCH_PENDING, REQUEST_ACCEPTED, REQUEST_ACCEPTED_AND_PAID, REQUEST_DELETED, REQUEST_PENDING } from 'helpers/requestStatus';
import { convertToServerAlphabetFormat, convertToAlphabetFromServerFormat as convertToAlphabetFromServerFormat, convertFromDbToServerAlphabet } from 'helpers/dateUtility';
import CardListItem from './CardListItem';
import { Card, CardBody } from 'reactstrap';
import routeNames from 'routes/routeNames';

export default function ReciprocalPlayCard(props) {
  const { item, user, browserHistory, from, loading, onClick, disabled, onDelete, history, title } = props;
  const [isAlreadyRequested, setIsAlreadyRequested] = useState(false);
  const [reqStatus, setReqStatus] = useState(null);
  const [disableViewANdReqAllReqBtn, setDisableViewANdReqAllReqBtn] = useState(false);

  useEffect(() => {
    (from === 'MyRequests' || from === 'viewAndRequest' || from === 'allRequests') && item && item.requests && item.requests.map((element, index) => {
      if (element.user_id === user._id) {
        setIsAlreadyRequested(true);
        setReqStatus(element.status);
      }
      if (from === 'allRequests' && element.user_id === user._id && element.status !== REQUEST_DELETED) {
        setDisableViewANdReqAllReqBtn(true);
      }
    });
    return () => {}
  }, []);

  return (
    <Card>
      {title && <Card.Title title={title} />}
      <CardBody>
        <CardListItem label={'Course Name'} value={item && item.course} />
        <CardListItem label={'Region'} value={item && item.region} />
        <CardListItem label={'Date'} value={item && item.date === 'To be agreed' ?
          item.date
          :
          item && convertToAlphabetFromServerFormat(item.date, item.date.length === 10)}
        />
        {item && item.playWithHomeClub &&
          <CardListItem label={'Play with'} value={'Only Home Club'} />
        }
        {item && item.description !== '' &&
          <CardListItem label={'Description'} value={item && item.description} />
        }
        {(from === 'MyRequests' || from === 'viewAndRequest') && item && item.requests && item.requests.map((element, index) => {
          if (element.user_id === user._id) {
            return (
              <CardListItem key={index} color={getRequestStatusColor(element.status)} label={'Request Status'} value={getRequestStatusText(element.status)} />
            )
          }
        })}
        {from === 'myListings' && <CardListItem color={getMatchStatusColor(item && item.status)} label={'Match Status'} value={item && getMatchStatusText(item.status)} />}
        <CardListItem label={'Created at'} value={item && convertFromDbToServerAlphabet(item.entry_date)} />

        {disableViewANdReqAllReqBtn &&
          <CardListItem label={'Requested'} value={'See this item in your requests.'} />
        }
        <hr />
        {/* Buttons */}
        <div className='d-grid align-items-end'>
          <div className='d-flex justify-content-between'>
            {/* My Listing */}
            {from === 'myListings' &&
              <>
                {!history && item && item.status === MATCH_PENDING &&
                  <Button
                    title={'Delete'}
                    mode={'contained'}
                    small
                    color='danger'
                    disabled={loading}
                    loading={loading}
                    width={'45%'}
                    onClick={() => onDelete()}
                  />
                }
                <Button
                  title={'View Matches'}
                  mode={'contained'}
                  small
                  disabled={loading}
                  width={!history && item && item.status === MATCH_PENDING ? '45%' : '100%'}
                  onClick={() => browserHistory.push({
                    pathname: routeNames.Private.ReciprocalPlay_ViewMatches,
                    item: item,
                    history,
                  })}
                />
              </>
            }
            {/* View & Request */}
            {from === 'viewAndRequest' &&
              <>
                {isAlreadyRequested ?
                  <>
                    {!history && reqStatus === REQUEST_ACCEPTED &&
                      <>
                        <Button
                          width='45%'
                          onClick={() => browserHistory.push({
                            pathname: routeNames.Private.PAYMENT,
                            offer: item, from: PAYMENT.RECIPROCAL_PLAY_PAYMENT
                          })}
                        >Pay</Button>
                        <Button
                          color='danger'
                          loading={loading}
                          disabled={disabled}
                          onClick={onDelete}
                        >Delete Request</Button>
                      </>
                    }
                    {!history && reqStatus === REQUEST_ACCEPTED_AND_PAID &&
                      <Button
                        onClick={() => browserHistory.push({
                          pathname: routeNames.Private.ViewAndChat,
                          item: item,
                        })}
                      >View & Chat</Button>
                    }
                    {!history && reqStatus === REQUEST_PENDING &&
                      <Button
                        color='danger'
                        loading={loading}
                        disabled={disabled}
                        onClick={onDelete}
                      >Delete Request</Button>
                    }
                  </>
                  :
                  <Button
                    loading={loading}
                    disabled={disabled}
                    onClick={onClick}
                  >Request to Play</Button>
                }
              </>
            }
            {/* All Requests */}
            {from === 'allRequests' &&
              <>
                <Button
                  disabled={user._id === item.user_id}
                  onClick={() => browserHistory.push({
                    pathname: routeNames.Private.ReciprocalPlay_ViewAndRequest,
                    item: item,
                  })}
                >{disableViewANdReqAllReqBtn ? 'View' : 'View & Request'}</Button>
              </>
            }
            {/* My Requests */}
            {from === 'MyRequests' &&
              <>
                {!history && reqStatus === REQUEST_ACCEPTED &&
                  <>
                    <Button
                      onClick={() => browserHistory.push({
                        pathname: routeNames.Private.PAYMENT,
                        offer: item, from: PAYMENT.RECIPROCAL_PLAY_PAYMENT
                      })}
                    >Pay</Button>
                    <Button
                      color='danger'
                      loading={loading}
                      disabled={disabled}
                      onClick={onDelete}
                    >Delete Request</Button>
                  </>
                }
                {!history && reqStatus === REQUEST_ACCEPTED_AND_PAID &&
                  <Button
                    onClick={() => browserHistory.push({
                      pathname: routeNames.Private.ViewAndChat,
                      item: item,
                      history,
                    })}
                  >View & Chat</Button>
                }
                {!history && reqStatus === REQUEST_PENDING &&
                  <Button
                    color='danger'
                    disabled={loading}
                    onClick={onClick}
                  >Delete Request</Button>
                }
              </>
            }
          </div>
        </div>
      </CardBody>
    </Card >
  )
}