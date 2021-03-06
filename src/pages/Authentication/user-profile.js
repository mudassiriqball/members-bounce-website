import React from 'react';
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const UserProfile = (props) => {
  return (
    <React.Fragment>
      <div className='page-content'>
        <MetaTags>
          <title>All Requests | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Reciprocal Golf'}
            breadcrumbItem={'All Requests'}
          />

        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
