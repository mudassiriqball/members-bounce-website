import React from 'react'
import { convertFromDbToServerAlphabet, convertToServerAlphabetFormat } from 'helpers/dateUtility'
import CardListItem from './Cards/CardListItem'
import { getRequestStatusColor, REQUEST_DECLINED, REQUEST_DELETED } from 'helpers//requestStatus';
import { Card, CardBody, Row, Col, Label } from 'reactstrap';

const UserDetailsCard = props => {
  const { element, children, item, chat } = props;
  return (
    <Card>
      <div className="bg-primary bg-soft">
        <Row>
          <Col>
            <div className="text-primary p-2">
              <Label className='bold font-size-18 w-100 text-center'>{'User Details'}</Label>
            </div>
          </Col>
        </Row>
      </div>
      <CardBody>
        {!item || chat ?
          <>
            <CardListItem label={'First Name'} value={element && element.firstName} />
            <CardListItem label={'Last Name'} value={element && element.lastName} />
            <CardListItem label={'Home Club'} value={element && element.homeClub} />
            {element && element.cdhId !== '' &&
              <CardListItem label={'Handicap'} value={element.cdhId} />
            }
            <CardListItem label={'Created at'} value={element && convertFromDbToServerAlphabet(element.entry_date)} />
            <div>
              <div >
                <CardListItem label={'Etiquette'} value={element && element.rating && element.rating.etiquette ? element.rating.etiquette.overall : 'Not available'} />
                <CardListItem label={'Pace of Play'} value={element && element.rating && element.rating.paceOfPlay ? element.rating.paceOfPlay.overall : 'Not available'} />
                <CardListItem label={'Overall'} value={element && element.rating && element.rating.overall ? element.rating.overall.overall : 'Not available'} />
              </div>
            </div>
          </>
          :
          <>
            <CardListItem label={'First Name'} value={element && element.user && element.user.firstName} />
            <CardListItem label={'Last Name'} value={element && element.user && element.user.lastName} />
            <CardListItem label={'Home Club'} value={element && element.user && element.user.homeClub} />
            {element && element.user && element.user.cdhId !== '' &&
              <CardListItem label={'Handicap'} value={element.user.cdhId} />
            }
            <CardListItem label={'Created at'} value={element && convertFromDbToServerAlphabet(element.user && element.user.entry_date)} />

            {element && element.reqData && element.reqData.status !== null && element.reqData.status === REQUEST_DELETED &&
              <CardListItem
                label={'Status'}
                color={getRequestStatusColor(REQUEST_DELETED)}
                value={'Deleted By User'}
              />
            }
            {element && element.reqData && element.reqData.status !== null && element.reqData.status === REQUEST_DECLINED &&
              <CardListItem
                label={'Request Status'}

                color={getRequestStatusColor(REQUEST_DECLINED)}
                value={'Declined by you'}
              />
            }

            {/* Rating */}
            <div title={'Rating'} id="2">
              <div>
                <CardListItem label={'Etiquette'} value={element && element.user && element.user.rating && element.user.rating.etiquette ? element.user.rating.etiquette.overall : 'Not available'} />
                <CardListItem label={'Pace of Play'} value={element && element.user && element.user.rating && element.user.rating.paceOfPlay ? element.user.rating.paceOfPlay.overall : 'Not available'} />
                <CardListItem label={'Overall'} value={element && element.user && element.user.rating && element.user.rating.overall ? element.user.rating.overall.overall : 'Not available'} />
              </div>
            </div>
          </>
        }
        {children}
      </CardBody>
    </Card>
  )
}

export default UserDetailsCard;
