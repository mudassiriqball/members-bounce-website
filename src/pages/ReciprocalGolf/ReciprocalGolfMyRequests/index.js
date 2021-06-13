import React, { useState, useEffect } from 'react'
import MyRequests from './MyRequests';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from 'store/actions';
import { MetaTags } from 'react-meta-tags';
import { Container } from 'reactstrap';
import { Breadcrumbs } from 'components/Common';
import { getBearerToken } from 'helpers/authentication';

const ReciprocalGolfMyRequests = props => {
  const { user, authenticateUser } = props;
  const token = getBearerToken();
  const [isTabOne, setIsTabOne] = useState(true);

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>My Requests | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Reciprocal Golf'}
            breadcrumbItem={'My Requests'}
          />
          {isTabOne ?
            <MyRequests
              {...props}
              user={user}
              token={token}
              isTabOne={isTabOne}
              setIsTabOne={setIsTabOne}
              browserHistory={props.history}
            />
            :
            <MyRequests
              {...props}
              user={user}
              token={token}
              history
              isTabOne={isTabOne}
              setIsTabOne={setIsTabOne}
              browserHistory={props.history}
            />

          }
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
  authenticateUser
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReciprocalGolfMyRequests));