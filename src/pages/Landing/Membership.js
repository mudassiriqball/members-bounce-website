import MetaTags from 'react-meta-tags';
import React from "react"

import { Row, Col, Container, Label, Card, CardBody } from "reactstrap";

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// Import Imgs
import img from "../../assets/images/megamenu-img.png"
import img1 from "../../assets/images/sidebar/img3.jpg"

import Button from '../../components/Common/Button';


const Membership = props => {
  const { history } = props;

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Membership | Members Bounce</title>
        </MetaTags>
        <Container fluid >

          {/* Option 1 */}
          <Row>
            <Col sm={12} md={4} lg={4} xl={4} className='d-flex align-items-stretch'>
              <Card className="overflow-hidden w-100">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-2">
                        <Label className='bold font-size-18 w-100 text-center'>{'OPTION 1'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody>
                  <Label className='font-size-18'>{'Free'}</Label>
                  <img
                    className="card-img-top"
                    src={img}
                    alt="bg"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className='d-flex align-items-stretch'>
              <Card className="overflow-hidden w-100">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-2">
                        <Label className='bold font-size-18 w-100 text-center'>{'BENEFITS'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody>
                  <Row>
                    <Col sm={12} md={4} lg={4} xl={4} className='d-flex align-items-center justify-content-center border-right'>
                      <Label className=''>{'Text Here'}</Label>
                    </Col>
                    <Col sm={12} md={8} lg={8} xl={8} >
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Option 2 */}
          <Row className='members-row'>
            <Col sm={12} md={4} lg={4} xl={4} className='d-flex align-items-stretch'>
              <Card className="overflow-hidden w-100">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-2">
                        <Label className='bold font-size-18 w-100 text-center'>{'OPTION 2'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody>
                  <Label className='font-size-18'>{'Level 1'}</Label>
                  <img
                    className="card-img-top"
                    src={img}
                    alt="bg"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className='d-flex align-items-stretch'>
              <Card className="overflow-hidden w-100">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-2">
                        <Label className='bold font-size-18 w-100 text-center'>{'BENEFITS'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody>
                  <Row>
                    <Col sm={12} md={4} lg={4} xl={4} className='d-flex align-items-center justify-content-center border-right'>
                      <Label className=''>{'Text Here'}</Label>
                    </Col>
                    <Col sm={12} md={8} lg={8} xl={8} >
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Option 3 */}
          <Row>
            <Col sm={12} md={4} lg={4} xl={4} className='d-flex align-items-stretch'>
              <Card className="overflow-hidden w-100">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-2">
                        <Label className='bold font-size-18 w-100 text-center'>{'OPTION 3'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody>
                  <Label className='font-size-18'>{'Level 2'}</Label>
                  <img
                    className="card-img-top"
                    src={img}
                    alt="bg"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className='d-flex align-items-stretch'>
              <Card className="overflow-hidden w-100">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-2">
                        <Label className='bold font-size-18 w-100 text-center'>{'BENEFITS'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody>
                  <Row>
                    <Col sm={12} md={4} lg={4} xl={4} className='d-flex align-items-center justify-content-center border-right'>
                      <Label className=''>{'Text Here'}</Label>
                    </Col>
                    <Col sm={12} md={8} lg={8} xl={8} >
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                      <div className='membership-card-div'>
                        <i class='bx bx-check bx-md tick-box-icon'></i>
                        <Label className='font-size-16 p-0 m-0'>{'Text Here'}</Label>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, {})(Membership)
)