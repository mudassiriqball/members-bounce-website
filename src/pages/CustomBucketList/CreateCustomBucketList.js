import TopHundredBucketListCard from 'components/Common/Cards/TopHundredBucketListCard';
import NoDataFound from 'components/Common/NoDataFound';
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { getBearerToken } from 'helpers/authentication';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Container, Label, Row } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from 'axios';
import { urls } from 'helpers';
import { AccessDeniedAlert, ErrorAlert, SuccessAlert } from 'components/Common/Alerts';
import { BucketListSearchFilter } from 'components/Common';
import { applyTopHundredFilters, getGolfCoursesRegAndProfile, getMyCustomBucketList, handleTopHundredSearch } from 'hooks';
import Loading from 'components/Common/Loading';
import isBottomReached from 'hooks/isBottomReached';
import { authenticateUser } from 'store/actions';

const CreateCustomBucketList = (props) => {
  const { isLoggedIn, user } = props;
  const { GOLF_COURSES_LIST_REG_PROFILE } = getGolfCoursesRegAndProfile();
  const token = getBearerToken();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const { MY_BUCKET_LIST } = getMyCustomBucketList(token, refresh, user && user._id);
  // Handle Load More
  const { IS_BOTTOM_REACHED } = isBottomReached();
  const [count, setCount] = useState(11);
  const [IS_LOADING, setIS_LOADING] = useState(false);

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  useEffect(() => {
    if (IS_BOTTOM_REACHED) {
      if (GOLF_COURSES_LIST_REG_PROFILE && count < GOLF_COURSES_LIST_REG_PROFILE.length) {
        setIS_LOADING(true);
        const append = GOLF_COURSES_LIST_REG_PROFILE.slice(count, parseInt(count) + 11);
        setList(prev => {
          return [...new Set([...prev, ...append])];
        });
        setCount(parseInt(count) + 11);
        setTimeout(() => {
          setIS_LOADING(false);
        }, 100);
      }
    }
  }, [IS_BOTTOM_REACHED]);

  console.log('IS_BOTTOM_REACHED:', IS_BOTTOM_REACHED)

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [accessAlert, setAccessAlert] = useState(false);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  useEffect(() => {
    if (GOLF_COURSES_LIST_REG_PROFILE)
      setList(GOLF_COURSES_LIST_REG_PROFILE.slice(0, 11));
    return () => {}
  }, [GOLF_COURSES_LIST_REG_PROFILE]);

  // Clear Filter
  const clearFilter = () => {
    setFilterType('');
    setList(GOLF_COURSES_LIST_REG_PROFILE);
  }

  // Add to bucket-list
  const addToBucketList = async (item, index) => {
    if (user.level < 1) {
      setAccessAlert(true);
    } else {
      setIsLoading(true);
      await axios({
        method: 'POST',
        url: urls.CREATE_CUSTOM_BUCKET_LIST + user._id,
        headers: {
          'authorization': token
        },
        data: item
      }).then(res => {
        setIsLoading(false);
        list.splice(1, index);
        setSuccessAlert(true);
      }).catch(err => {
        setIsLoading(false);
        setErrorAlert(true);
        console.log('custom addToBucketList err:', err);
      });
    }
  }

  return (
    <React.Fragment>
      <div className='page-content h-100'>
        <MetaTags>
          <title>Create Custom Bucket-list | Members Bounce</title>
        </MetaTags>
        <Container fluid className='h-100'>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Custom Bucket-list'}
            breadcrumbItem={'Create Custom Bucket-list'}
          />
          {accessAlert &&
            <AccessDeniedAlert onClick={() => setAccessAlert(false)} />
          }
          {errorAlert &&
            <ErrorAlert onClick={() => setErrorAlert(false)} />
          }
          {successAlert &&
            <SuccessAlert onClick={() => setSuccessAlert(false)} />
          }
          <BucketListSearchFilter
            query={query}
            handleSearch={(val) => handleTopHundredSearch(list, val, setQuery, setIsSearch, setSearchList)}
            // Filter
            applyFilter={() => applyTopHundredFilters(setList, GOLF_COURSES_LIST_REG_PROFILE, filterBy, filterType)}
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
                  <Label >{PAGE_TEXTS.CREATE_CUSTOM_BUCKET_LIST}</Label>
                </Col>
                {list.map((item, index) => {
                  let found = null;
                  found = MY_BUCKET_LIST && MY_BUCKET_LIST.filter(element => element.course === item.course);
                  if (found && found.length > 0) {
                    return;
                  }
                  return (
                    <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                      <TopHundredBucketListCard
                        item={item}
                        user={user}
                        from={'CreateBucketList'}
                        loading={isLoading}
                        onClick={() => addToBucketList(item, index)}
                      />
                    </Col>
                  )
                })}
              </Row>
              :
              <NoDataFound />
            :
            searchList && searchList.length > 0 ?
              <Row>
                <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                  <Label >{PAGE_TEXTS.CREATE_CUSTOM_BUCKET_LIST}</Label>
                </Col>
                {searchList.map((item, index) => {
                  let found = null;
                  found = MY_BUCKET_LIST && MY_BUCKET_LIST.filter(element => element.course === item.course);
                  if (found && found.length > 0) {
                    return;
                  }
                  return (
                    <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                      <TopHundredBucketListCard
                        item={item}
                        user={user}
                        from={'CreateBucketList'}
                        loading={isLoading}
                        onClick={() => addToBucketList(item, index)}
                      />
                    </Col>
                  )
                })}
              </Row>
              :
              <NoDataFound />
          }
          {IS_LOADING && <Loading />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCustomBucketList));
