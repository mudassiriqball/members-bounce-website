import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const PlayNowTop100 = (props) => {
  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>Top 100 | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Play Now'}
            breadcrumbItem={'Top 100'}
          />

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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayNowTop100));
