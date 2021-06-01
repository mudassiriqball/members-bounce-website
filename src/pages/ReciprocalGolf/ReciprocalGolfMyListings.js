import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const ReciprocalGolfMyListings = (props) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReciprocalGolfMyListings));
