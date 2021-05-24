import MetaTags from 'react-meta-tags';
import React from "react"

import { Row, Col, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

const Home = props => {
  const {} = props;

  return (
    <>
      <MetaTags>
        <title>Home | Members Bounce</title>
      </MetaTags>
      <div className="landing-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, {})(Home)
)