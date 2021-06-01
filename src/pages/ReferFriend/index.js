import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const ReferFriend = (props) => {
  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>Refer Friend | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Refer Friend'}
          // breadcrumbItem={'All Requests'}
          />

        </Container>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReferFriend));
