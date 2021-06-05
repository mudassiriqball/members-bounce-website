import React from 'react'
import { Card, CardBody, Row, Col, Label } from 'reactstrap';
import Button from '../Button';
import CardListItem from './CardListItem';
import Switch from "react-switch"

export default function TopHundredBucketListCard(props) {
  const { item, user, from, loading, onClick, onCheckBoxPress } = props;

  return (
    <Card className="overflow-hidden">
      <CardBody className="">
        <div>
          <CardListItem label={'Course Name'} value={item && item.course} />
          <CardListItem label={'Region'} value={item && item.region || 'none'} />
          <CardListItem label={'Green Fee'} value={item && item.greenFee || 0} />
          <CardListItem label={'Course Type'} value={item && item.courseType || 'none'} />
          <hr />
          <div className='flex-end'>
            {from === 'CreateBucketList' ?
              <div>
                <Button
                  disabled={loading}
                  onClick={onClick}
                >Add to Bucket-list</Button>
              </div>
              :
              from === 'MyBucketList' ?
                <Row className='d-flex justify-content-between align-items-center'>
                  <Col className='d-flex justify-content-between align-items-center'>
                    <Label className=''>Played</Label>
                    <Switch
                      className="me-1 mb-sm-8 mb-2"
                      onColor="#02a499"
                      height={20}
                      width={45}
                      onChange={onCheckBoxPress}
                      checked={item && item.played}
                    />
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <Button
                      disabled={loading}
                      onClick={onClick}
                    >Remove</Button>
                  </Col>
                </Row>
                :
                from === 'TopHundredPlayed' ?
                  <Row>
                    <Col className='d-flex justify-content-between align-items-center'>
                      <Label className=''>Played</Label>
                      <Switch
                        className="me-1 mb-sm-8 mb-2"
                        onColor="#02a499"
                        height={20}
                        width={45}
                        onChange={onCheckBoxPress}
                        checked={item && item.played}
                      />
                    </Col>
                  </Row>
                  :
                  null
            }
          </div>
        </div>
      </CardBody>
    </Card>
  )
}