import MetaTags from 'react-meta-tags';
import React from "react"

import { Row, Col, Container, Label, Card, CardBody } from "reactstrap";

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// Import Imgs
import img from "../../assets/images/members-text-img.svg"
import img1 from "../../assets/images/megamenu-img.png"

import Button from '../../components/Common/Button';


const Home = props => {
  const { history } = props;

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Home | Members Bounce</title>
        </MetaTags>
        <Container fluid >
          <Row className="h-100">
            <Col md={3} lg={3} xl={3}>
              <img
                className="card-img-top img-fluid"
                src={img}
                alt="bg"
              />
            </Col>
            <Col md={9} lg={9} xl={9}>
              <Row className="h-100">
                <Col className='justify-content-center align-items-center d-flex flex-column' md={6} lg={6} xl={6}>
                  <Label className='bold font-size-20'>{'INCREMENTAL PARTICIPATION'}</Label>
                  <Label className='bold font-size-20'>{'IN GOLF'}</Label>
                  <Label className='bold font-size-20'>{'Join our movement'}</Label>
                </Col>
                <Col className='justify-content-center align-items-center d-flex flex-column' md={6} lg={6} xl={6}>
                  <Button
                    type="button"
                    color="primary"
                    className='m-2'
                    id="showtoast"
                    onClick={() => {
                      showToast()
                    }}
                  >
                    {'FIND OUT MORE'}
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    className='m-2'
                    id="showtoast"
                    onClick={() => {
                      history.push('/register')
                    }}
                  >
                    {'JOIN NOW'}
                  </Button>
                  <Label className=''>{'Renew our membership options below'}</Label>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="members-row">
            <Col md={6} lg={6} xl={6} className='d-flex align-items-stretch'>
              <Card className="overflow-hidden w-100">
                <CardBody className="justify-content-between d-flex flex-column">
                  <Label className='bold font-size-20 text-center w-100'>{'MEMBERS BENEFITS'}</Label>
                  <div className='d-flex flex-row justify-content-evenly'>
                    <Button
                      type="button"
                      color="primary"
                      className='m-2'
                      id="showtoast"
                      onClick={() => {
                        showToast()
                      }}
                    >
                      {'DOWNLOAD APPLE APP'}
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      className='m-2'
                      id="showtoast"
                      onClick={() => {
                        showToast()
                      }}
                    >
                      {'DOWNLOAD ANDROID APP'}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} lg={6} xl={6} className='d-flex align-items-stretch'>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <img
                    className="card-img-top img-fluid"
                    src={img1}
                    alt="bg"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="h-100">
            <Col>
              <Card className="overflow-hidden bg-primary bg-soft">
                <CardBody>
                  <Label className='bold font-size-24 w-100 text-center text-primary'>{'COMPARE MEMBERSHIP OPTIONS'}</Label>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="h-100">
            <Col sm={12} md={6} lg={4} xl={4}>
              <Card className="overflow-hidden h-auto">
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
                  <Label className='font-size-18'>{'FREE'}</Label>
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
                  <Label className='font-size-16 pt-3'>{'ADULT OVER 18'}</Label>
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={4}>
              <Card className="overflow-hidden h-auto">
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
                  <Label className='font-size-18'>{'LEVEL 1'}</Label>
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
                  <Label className='font-size-16 pt-3'>{'ADULT OVER 18'}</Label>
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4} xl={4}>
              <Card className="overflow-hidden h-auto">
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
                  <Label className='font-size-18'>{'LEVEL 2'}</Label>
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
                  <Label className='font-size-16 pt-3'>{'ADULT OVER 18'}</Label>
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
  connect(mapStateToProps, {})(Home)
)