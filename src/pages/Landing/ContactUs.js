import MetaTags from 'react-meta-tags';
import React, { useState } from "react"

import { Row, Col, Container, Label, Card, CardBody } from "reactstrap";

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// Import Imgs
import img1 from "../../assets/images/sidebar/img3.jpg"

import Button from '../../components/Common/Button';
import { AvForm, AvField } from "availity-reactstrap-validation"


const ContactUs = props => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const handleValidSubmit = () => {

  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Contact | Members Bounce</title>
        </MetaTags>
        <Container fluid >

          <Row className="members-row">
            <Col className='d-flex align-items-stretch'>
              <Card className="overflow-hidden h-auto">
                <CardBody className='d-flex justify-content-center align-items-center'>
                  <Label className='font-size-20 p-3'>{'IF YOU ARE LIKE TO GET IN TOUCH OR FIND OUT MORE ABOUT OUR MOVEMENT TO INCREASE PARTICIPATION IN GOLF, PLEASE USE OUR CONTACT FORM.'}</Label>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="overflow-hidden h-auto">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col>
                      <div className="text-primary p-3">
                        <Label className='bold font-size-24 w-100 text-center text-primary'>{'CONTACT FORM'}</Label>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className='w-100'>
                  <AvForm
                    className="form-horizontal"
                    onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                  >
                    <div className="mb-3">
                      <AvField
                        name="name"
                        label="Name"
                        // className="form-control"
                        placeholder="Enter full name"
                        type="text"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="email"
                        label="Email"
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="message"
                        label="Message"
                        className="form-control"
                        placeholder="Enter your message"
                        type="textarea"
                        required
                      />
                    </div>
                    <Button block type="submit" loading={loading}>Submit</Button>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="h-50">
            <img
              className="card-img-top h-50"
              src={img1}
              alt="bg"
            />
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
  connect(mapStateToProps, {})(ContactUs)
)