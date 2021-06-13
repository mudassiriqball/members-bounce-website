import React, { useState, useEffect, useRef } from 'react';
import { Loading, NoDataFound, PlayNowSearchFilter, ReciprocalPlayCard, } from 'components/Common';
import { applyPlayNowFilters, getMyReciprocalListing, handlePlayNowSearch } from 'hooks';
import axios from 'axios';
import { Card, CardBody, Col, Label, Row } from 'reactstrap';
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { urls } from 'helpers';
import Swal from 'sweetalert2';
import theme from 'constants/theme';

const Matches = props => {
  const { user, token, history, isTabOne, setIsTabOne, browserHistory } = props;
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const { IS_LOADING, MY_REQUESTS } = getMyReciprocalListing(token, refresh, user && user._id, history);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    if (MY_REQUESTS)
      setList(MY_REQUESTS);
    return () => {}
  }, [MY_REQUESTS]);

  // Clear Filter
  const clearFilter = () => {
    setFilterType('');
    setList(MY_REQUESTS);
  }

  // Delete Offer
  const handleDeleteMyOffer = async (item, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this offer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.LightThemeColors.RED,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: theme.LightThemeColors.SUCCESS,
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await axios({
          method: 'DELETE',
          url: urls.DELETE_RECIPROCAL_LISTING_OFFER + item._id,
          headers: {
            'authorization': token
          },
        }).then(res => {
          setIsLoading(false);
          setRefresh(refresh + 1);
          Swal.fire(
            'Deleted!',
            'Your request processed successfully',
            'success'
          )
        }).catch(err => {
          console.log('handleDeleteMyOffer err:', err);
          setIsLoading(false);
          Swal.fire(
            'Error',
            'Something went wrong, Please try again later!',
            'error'
          )
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    });
  }

  if (IS_LOADING) {
    return <Loading />
  }

  return (
    <div>
      {list.length > 0 &&
        <PlayNowSearchFilter
          from='reciprocalPlay'
          query={query}
          handleSearch={(val) => handlePlayNowSearch(list, val, setQuery, setIsSearch, setSearchList)}
          // Filter
          applyFilter={() => applyPlayNowFilters(setList, MY_REQUESTS, filterBy, filterType)}
          clearFilter={clearFilter}
          filterBy={filterBy}
          filterType={filterType}
          setFilterBy={setFilterBy}
          setFilterType={setFilterType}
        />
      }
      <Card>
        <CardBody className='p-0'>
          <Row className='p-0 m-0'>
            <Col onClick={() => setIsTabOne(true)} className={isTabOne ? 'bg-primary tab-col text-white' : 'bg-white tab-col'}>My Listing</Col>
            <Col onClick={() => setIsTabOne(false)} className={!isTabOne ? 'bg-primary tab-col text-white' : 'bg-white tab-col'}>History</Col>
          </Row>
        </CardBody>
      </Card>
      {!isSearch ?
        list && list.length > 0 ?
          <Row>
            <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
              <Label >{PAGE_TEXTS.PLAY_NOW_MY_LISTING}</Label>
            </Col>
            {list.map((item, index) => {
              return (
                <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                  <ReciprocalPlayCard
                    item={item}
                    user={user}
                    browserHistory={browserHistory}
                    loading={isLoading}
                    history={history}
                    from={'myListings'}
                    onDelete={() => handleDeleteMyOffer(item, index)}
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
              <Label >{PAGE_TEXTS.RECIPROCAL_PLAY_MATCHES}</Label>
            </Col>
            {searchList.map((item, index) => {
              return (
                <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                  <ReciprocalPlayCard
                    item={item}
                    user={user}
                    browserHistory={browserHistory}
                    loading={isLoading}
                    history={history}
                    from={'myListings'}
                    onDelete={() => handleDeleteMyOffer(item, index)}
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
    </div>
  )
}

export default Matches;
