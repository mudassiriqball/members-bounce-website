import React, { useEffect, useState } from 'react'
import { Card, Label, Row, Col } from 'reactstrap';
import { Button } from '..';
import { PAYMENT } from '../../../helpers/payment';
import { getGolferType } from '../../../helpers/golfersType';
import { getRequestStatusColor, getRequestStatusText, REQUEST_ACCEPTED, getMatchStatusColor, getMatchStatusText, REQUEST_PENDING, REQUEST_DELETED, MATCH_PENDING, REQUEST_ACCEPTED_AND_PAID } from '../../../helpers/requestStatus';
import { converToAlphabatFromServerFormat, convertFromDbToServerAlphabet } from '../../../helpers/dateUtility';
import CardListItem from './CardListItem';

export default function PlayNowOfferCard(props) {
  const { item, user, from, loading, onClick, disabled, onDelete, history, title } = props;
  const [acceptedCount, setAcceptedCount] = useState(1);
  const [isAlreadyRequested, setIsAlreadyRequested] = useState(false);
  const [reqStatus, setReqStatus] = useState(null);
  const [disableViewAndReqAllReqBtn, setDisableViewANdReqAllReqBtn] = useState(false);

  useEffect(() => {
    ('privateAndMunicipal' || from === 'topHundred' || from === 'HomeClubOffers' || from === 'MyRequests' || from === 'viewAndRequest') && item && item.requests && item.requests.forEach((element, index) => {
      if (element.status === REQUEST_ACCEPTED) {
        setAcceptedCount(acceptedCount + 1);
      }
      if (element.user_id === user._id) {
        setIsAlreadyRequested(true);
        setIsAlreadyRequested(true);
        setReqStatus(element.status);
      }
      if (('privateAndMunicipal' || from === 'topHundred' || from === 'HomeClubOffers') && element.user_id === user._id && element.status !== REQUEST_DELETED) {
        setDisableViewANdReqAllReqBtn(true);
      }
    });
    return () => {}
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardBody className="">
        <div>
          {title && <Card.Title title={title} />}
          <CardListItem label={'Course Name'} value={item && item.club} />
          <CardListItem label={'Region'} value={item && item.region} />
          <CardListItem label={'Green Fee'} value={item && item.greenFee} />
          <CardListItem label={'Available Guest Slots'} value={item && (item.size - acceptedCount)} />
          <CardListItem label={'Golfers Type'} value={item && getGolferType(item.golferType)} />
          <CardListItem label={'Date'} value={item && item.date === 'To be agreed' ?
            item.date
            :
            item && item.date && item.date.length && converToAlphabatFromServerFormat(item.date, item.date.length === 10)}
          />
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
          {disableViewAndReqAllReqBtn && from !== 'MyRequests' &&
            <CardListItem label={'Requested'} value={'See this item in your requests.'} />
          }
          <hr />
          {/* Buttons */}
          <div className='flex-end'>
            {/* My Listing */}
            {from === 'myListings' &&
              <>
                {!history && item && item.status === MATCH_PENDING &&
                  <Button
                    color='danger'
                    disabled={loading}
                    loading={loading}
                    onClick={() => onDelete()}
                  >{'Delete'}</Button>
                }
                <Button
                  disabled={loading}
                  onClick={() => navigation.navigate('ViewMatches', { item: item, history })}
                >{'View Matches'}</Button>
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
                          disabled={loading}
                        // onClick={() => navigation.navigate('Payment', { offer: item, from: PAYMENT.PLAY_NOW_PAYMENT })}
                        >
                          {'Pay'}
                        </Button>
                        <Button
                          color='danger'
                          disabled={loading}
                          loading={loading}
                          onClick={() => onDelete()}
                        >
                          {'Delete'}
                        </Button>
                      </>
                    }
                    {!history && reqStatus === REQUEST_ACCEPTED_AND_PAID &&
                      <Button
                        onClick={() => navigation.navigate('ViewAndChat', { item: item })}
                      >
                        {'View & Chat'}
                      </Button>
                    }
                    {!history && reqStatus === REQUEST_PENDING &&
                      <Button
                        color='danger'
                        disabled={loading}
                        loading={loading}
                        onClick={() => onDelete()}
                      >{'Delete Request'}</Button>
                    }
                  </>
                  :
                  <Button
                    loading={loading}
                    disabled={disabled}
                    onClick={onClick}
                  >{'Request to Play'}</Button>
                }
              </>
            }
            {/* Private & Municipal ,Home Club */}
            {(from === 'privateAndMunicipal' || from === 'HomeClubOffers') &&
              <Button
                disabled={user._id === item.user_id}
                onClick={() => navigation.navigate('ViewAndRequest', { item: item })}
              >{disableViewAndReqAllReqBtn ? 'View' : 'View & Request'}</Button>
            }
            {/* Top Hundred  */}
            {from === 'topHundred' &&
              <Button
                disabled={user._id === item.user_id}
                onClick={() => {
                  if (user.level < 1) {
                    alert(
                      'Access Denied',
                      'Sorry your account is free and you can not book Top 100 courses.',
                      [
                        {
                          text: 'Ok',
                          style: 'default',
                          onClick: () => {},
                        },
                      ]
                    );
                  } else {
                    // navigation.navigate('ViewAndRequest', { item: item });
                  }
                }}
              >{disableViewAndReqAllReqBtn ? 'View' : 'View & Request'}</Button>
            }
            {/* My Requests */}
            {from === 'MyRequests' &&
              <>
                {!history && reqStatus === REQUEST_ACCEPTED_AND_PAID &&
                  <Button
                    onClick={() => navigation.navigate('ViewAndChat', { item: item, history })}
                  >{'View & Chat'}</Button>
                }
                {!history && reqStatus === REQUEST_ACCEPTED &&
                  <>
                    <Button
                      onClick={() => navigation.navigate('Payment', { offer: item, from: PAYMENT.PLAY_NOW_PAYMENT })}
                    >{'Pay'}</Button>
                    <Button
                      color='danger'
                      disabled={loading}
                      loading={loading}
                      width={'45%'}
                      onClick={() => onDelete()}
                    >{'Delete'}</Button>
                  </>
                }
                {!history && reqStatus === REQUEST_PENDING &&
                  <Button
                    color='danger'
                    disabled={loading}
                    loading={loading}
                    width={'45%'}
                    onRight
                    onClick={() => onDelete()}
                  >{'Delete'}</Button>
                }
              </>
            }
            {/* View & Chat */}
            {from === 'viewAndChat' &&
              <>
                {(item && (item.user_id === user._id)) &&
                  <Button
                    color='success'
                    disabled={loading}
                    onClick={() => onDelete()}
                  >{'Start'}</Button>
                }
              </>
            }
          </div>
        </div>
      </CardBody>
    </Card>
  )
}