import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const PlayNowPrivateAndMunicipal = (props) => {
  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>Private & Municipal | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Play Now'}
            breadcrumbItem={'Private & Municipal'}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayNowPrivateAndMunicipal));
