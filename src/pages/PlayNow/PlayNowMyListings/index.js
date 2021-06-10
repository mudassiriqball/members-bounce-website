import { getBearerToken } from "helpers/authentication";
import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { authenticateUser } from "store/actions";
//Import Breadcrumb
import { Breadcrumbs } from "../../../components/Common"
import Matches from "./Matches";

const PlayNowMyListings = (props) => {
  const { user } = props;
  const token = getBearerToken();
  const [reload, setReload] = useState(0);
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
            title={'Play Now'}
            breadcrumbItem={'My Listings'}
          />
          {isTabOne ?
            <Matches
              user={user}
              token={token}
              reload={reload}
              setReload={setReload}
              isTabOne={isTabOne}
              setIsTabOne={setIsTabOne}
              browserHistory={props.history}
            />
            :
            <Matches
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
  )
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayNowMyListings));
