import React, { useState, useEffect, useRef } from 'react'
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Label } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ErrorAlert, SuccessAlert } from '../../components/Common/Alerts';

import TopHundredBucketListCard from '../../components/Common/Cards/TopHundredBucketListCard';
import Loading from '../../components/Common/Loading';
import NoDataFound from '../../components/Common/NoDataFound';
import PAGE_TEXTS from '../../constants/PAGE_TEXTS';
import { getBearerToken } from '../../helpers/authentication';
import axios from 'axios';
import { urls } from '../../helpers';
import getTopHundredPlayed from '../../hooks/Top-100-Bucket-list/getTopHundredPlayed';
import { BucketListSearchFilter } from '../../components/Common';
import handleTopHundredSearch from '../../hooks/Searching/handleTopHundredSearch';
import applyTopHundredFilters from '../../hooks/Filtering/applyTopHundredFilters';

const Top100BucketListPlayed = (props) => {
  const { user, isLoggedIn } = props;
  const token = getBearerToken();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const { IS_LOADING, TOP_HUNDRED_PLAYED } = getTopHundredPlayed(token, refresh, user && user._id);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterBy, setFilterBy] = useState('');

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);


  useEffect(() => {
    if (TOP_HUNDRED_PLAYED)
      setList(TOP_HUNDRED_PLAYED);
    return () => {}
  }, [TOP_HUNDRED_PLAYED]);

  // Clear Filter
  const clearFilter = () => {
    setFilterType('');
    setList(TOP_HUNDRED_PLAYED);
  }

  // Handle set played
  const setPlayed = async (item) => {
    setIsLoading(true);
    await axios({
      method: 'PUT',
      url: urls.SET_PLAYED_MY_BUCKET_LIST + item._id,
      headers: {
        'authorization': token
      },
      params: { played: !item.played }
    }).then(res => {
      setIsLoading(false);
      setRefresh(refresh + 1);
      setIsLoading(false);
      setSuccessAlert(true);
    }).catch(err => {
      console.log('ernnr:', err);
      setIsLoading(false);
      setErrorAlert(true);
    });
  }

  return (
    <React.Fragment>
      <div className='page-content h-100'>
        <MetaTags>
          <title>Top 100 Played | Members Bounce</title>
        </MetaTags>
        {errorAlert &&
          <ErrorAlert onClick={() => setErrorAlert(false)} />
        }
        {successAlert &&
          <SuccessAlert onClick={() => setSuccessAlert(false)} />
        }
        <Container fluid className='h-100'>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Top 100 Bucket-list'}
            breadcrumbItem={'Top 100 Played'}
          />
          <BucketListSearchFilter
            from={'TopHundredBucketList'}
            query={query}
            handleSearch={(val) => handleTopHundredSearch(list, val, setQuery, setIsSearch, setSearchList)}
            // Filter
            applyFilter={() => applyTopHundredFilters(setList, TOP_HUNDRED_PLAYED, filterBy, filterType)}
            clearFilter={clearFilter}
            filterBy={filterBy}
            filterType={filterType}
            setFilterBy={setFilterBy}
            setFilterType={setFilterType}
          />
          {!isSearch ?
            list && list.length > 0 ?
              <Row>
                <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                  <Label >{PAGE_TEXTS.TOP_100_Played_TOP_100_BUCKET_LIST}</Label>
                </Col>
                {list.map((item, index) => {
                  return (
                    <Col lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                      <TopHundredBucketListCard
                        item={item}
                        user={user}
                        from={'TopHundredPlayed'}
                        loading={isLoading}
                        onCheckBoxPress={() => setPlayed(item)}
                      />
                    </Col>
                  )
                })}
              </Row>
              :
              IS_LOADING ?
                <Loading />
                :
                <NoDataFound />
            :
            searchList && searchList.length > 0 ?
              <Row>
                <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                  <Label >{PAGE_TEXTS.TOP_100_Played_TOP_100_BUCKET_LIST}</Label>
                </Col>
                {searchList.map((item, index) => {
                  return (
                    <Col lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                      <TopHundredBucketListCard
                        item={item}
                        user={user}
                        from={'TopHundredPlayed'}
                        loading={isLoading}
                        onCheckBoxPress={() => setPlayed(item)}
                      />
                    </Col>
                  )
                })}
              </Row>
              :
              IS_LOADING ?
                <Loading />
                :
                <NoDataFound />
          }
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top100BucketListPlayed));
