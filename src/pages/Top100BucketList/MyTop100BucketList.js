import React, { useState, useEffect, useRef } from 'react'
import TopHundredBucketListCard from 'components/Common/Cards/TopHundredBucketListCard';
import Loading from 'components/Common/Loading';
import NoDataFound from 'components/Common/NoDataFound';
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { getBearerToken } from 'helpers/authentication';
import getMyBucketList from 'hooks/Top-100-Bucket-list/getMyBucketList';
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Label, Row, Col } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from 'axios';
import { urls } from 'helpers';
import { ErrorAlert, SuccessAlert } from 'components/Common/Alerts';
import { BucketListSearchFilter } from 'components/Common';
import handleTopHundredSearch from 'hooks/Searching/handleTopHundredSearch';
import applyTopHundredFilters from 'hooks/Filtering/applyTopHundredFilters';

const MyTop100BucketList = (props) => {
  const { user, isLoggedIn } = props;
  const token = getBearerToken();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [serachList, setSerachList] = useState([]);
  const { IS_LOADING, MY_BUCKET_LIST } = getMyBucketList(token, refresh, user && user._id);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterBy, setFilterBy] = useState('');

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    if (MY_BUCKET_LIST)
      setList(MY_BUCKET_LIST);
    return () => {}
  }, [MY_BUCKET_LIST]);

  // Clear Filter
  const clearFilter = () => {
    setFilterType('');
    setList(MY_BUCKET_LIST);
  }

  // Remove From bucketlist
  const removerToMyBucket = async (item, index) => {
    setIsLoading(true);
    await axios({
      method: 'DELETE',
      url: urls.DELETE_MY_BUCKET_LIST + item._id,
      headers: {
        'authorization': token
      },
    }).then(res => {
      setList(list && list.filter(element => element._id !== item._id));
      MY_BUCKET_LIST.splice(1, index);
      setSuccessAlert(true);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      setErrorAlert(true);
      console.log('removerToMyBucket err:', err);
    });
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
      setSuccessAlert(true);
    }).catch(err => {
      console.log('setPlayed error:', err);
      setErrorAlert(true);
      setIsLoading(false);
    });
  }

  return (
    <>
      <div className='page-content h-100'>
        <MetaTags>
          <title>My Bucket-list | Members Bounce</title>
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
            breadcrumbItem={'My Bucket-list'}
          />
          <BucketListSearchFilter
            from={'TopHundredBucketList'}
            colors={colors}
            query={query}
            handleSearch={(val) => handleTopHundredSearch(list, val, setQuery, setIsSearch, setSerachList)}
            // Filter
            applyFilter={() => applyTopHundredFilters(setList, MY_BUCKET_LIST, filterBy, filterType)}
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
                  <Label >{PAGE_TEXTS.MY_BUCKET_LIST_TOP_100_BUCKET_LIST}</Label>
                </Col>
                {list.map((item, index) => {
                  return (
                    <Col lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                      <TopHundredBucketListCard
                        item={item}
                        user={user}
                        from={'MyBucketList'}
                        loading={isLoading}
                        onCheckBoxPress={() => setPlayed(item)}
                        onClick={() => removerToMyBucket(item, index)}
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
                  <Label >{PAGE_TEXTS.MY_BUCKET_LIST_TOP_100_BUCKET_LIST}</Label>
                </Col>
                {searchList.map((item, index) => {
                  return (
                    <TopHundredBucketListCard
                      item={item}
                      user={user}
                      from={'MyBucketList'}
                      loading={isLoading}
                      onCheckBoxPress={() => setPlayed(item)}
                      onClick={() => removerToMyBucket(item, index)}
                    />
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
    </>
  )
}

const mapStatetoProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(MyTop100BucketList));
