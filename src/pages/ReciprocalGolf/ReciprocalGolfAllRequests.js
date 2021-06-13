import React, { useEffect } from 'react';
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import { authenticateUser } from 'store/actions';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const ReciprocalGolfAllRequests = (props) => {
  const { user, isLoggedIn, authenticateUser } = props;

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

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

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
  authenticateUser
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReciprocalGolfAllRequests));
