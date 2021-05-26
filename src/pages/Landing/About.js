import MetaTags from 'react-meta-tags';
import React from "react"

import { Row, Col, Container, Label, Card, CardBody } from "reactstrap";

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// Import Imgs
import img1 from "../../assets/images/sidebar/img3.jpg"

import Button from 'components/Common/Button';


const About = props => {
  const { history } = props;

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>About | Members Bounce</title>
        </MetaTags>
        <Container fluid >
          <Row className="h-50">
            <img
              className="card-img-top h-50"
              src={img1}
              alt="bg"
            />
          </Row>

          {/* Our Storey */}
          <Row className="members-row">
            <Col>
              <Card className="overflow-hidden h-auto">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-3">
                        <Label className='bold font-size-24 w-100 text-center text-primary'>{'OUR STORY'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className='d-flex justify-content-center align-items-center'>
                  <Label className='p-5'>{'Text Here'}</Label>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Who Are We */}
          <Row>
            <Col>
              <Card className="">
                <div className="bg-primary bg-soft p-3">
                  <Row>
                    <Label className='bold font-size-24 w-100 text-center text-primary'>{'WHO ARE WE'}</Label>
                  </Row>
                </div>
                <CardBody>
                  <Row>
                    <Col sm={12} md={6} lg={4} xl={4}>
                      <Card className="overflow-hidden h-auto">
                        <div className="bg-primary bg-soft">
                          <Row>
                            <img
                              className="card-img-top h-50"
                              src={img1}
                              alt="bg"
                            />
                          </Row>
                        </div>
                        <CardBody>
                          <Label className=''>{'Text Here'}</Label>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={4}>
                      <Card className="overflow-hidden h-auto">
                        <div className="bg-primary bg-soft">
                          <Row>
                            <img
                              className="card-img-top h-50"
                              src={img1}
                              alt="bg"
                            />
                          </Row>
                        </div>
                        <CardBody>
                          <Label className=''>{'Text Here'}</Label>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={4}>
                      <Card className="overflow-hidden h-auto">
                        <div className="bg-primary bg-soft">
                          <Row>
                            <img
                              className="card-img-top h-50"
                              src={img1}
                              alt="bg"
                            />
                          </Row>
                        </div>
                        <CardBody>
                          <Label className=''>{'Text Here'}</Label>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="">
                <div className="bg-primary bg-soft p-3">
                  <Row>
                    <Label className='bold font-size-24 w-100 text-center text-primary'>{'WANT TO BE PART OF OUR MOVEMENT'}</Label>
                  </Row>
                </div>
                <CardBody className='d-flex p-5 justify-content-center align-items-center'>
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
  connect(mapStateToProps, {})(About)
)