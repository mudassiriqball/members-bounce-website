import { Breadcrumbs } from 'components/Common';
import { getBearerToken } from 'helpers/authentication';
import React, { useState, useEffect } from 'react'
import { MetaTags } from 'react-meta-tags';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { authenticateUser } from 'store/actions';
import Matches from './Matches';

const ReciprocalGolfMyListings = props => {
  const { user, authenticateUser } = props;
  const [reload, setReload] = useState(0);
  const token = getBearerToken();
  const [isTabOne, setIsTabOne] = useState(true);

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>My Listings | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Reciprocal Golf'}
            breadcrumbItem={'My Listings'}
          />
          {isTabOne ?
            <Matches
              {...props}
              user={user}
              token={token}
              reload={reload}
              setReload={setReload}
              isTabOne={isTabOne}
              setIsTabOne={setIsTabOne}
            />
            :
            <Matches
              {...props}
              user={user}
              token={token}
              history
              reload={reload}
              setReload={setReload}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReciprocalGolfMyListings));
