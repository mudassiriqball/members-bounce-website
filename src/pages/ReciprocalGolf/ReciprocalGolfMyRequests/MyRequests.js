import React, { useState, useEffect, useRef } from 'react';
import { Loading, NoDataFound, ReciprocalPlayCard } from 'components/Common';
import { applyPlayNowFilters, getMyReciprocalRequests, handlePlayNowSearch, sendNotification } from 'hooks';
import axios from 'axios';
import Swal from 'sweetalert2';
import theme from 'constants/theme';
import { Notifications, urls } from 'helpers';
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { Col, Row } from 'reactstrap';

const MyRequests = props => {
  const { user, token, browserHistory, history } = props;
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const { IS_LOADING, MY_REQUESTS } = getMyReciprocalRequests(token, refresh, user && user._id, history);
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

  // Delete My Request
  const handleDeleteMyRequest = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this request!',
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
          method: 'PUT',
          url: urls.DELETE_RECIPROCAL_PLAY_REQUEST + item._id,
          headers: {
            'authorization': token
          },
          data: {
            user_id: user._id,
          }
        }).then(res => {
          setIsLoading(false);
          Swal.fire(
            'Deleted!',
            'Your request processed successfully',
            'success'
          )
          sendNotification(
            token,
            item.user_id,
            user._id,
            Notifications.RECIPROCAL_PLAY_TITLE,
            Notifications.RECIPROCAL_PLAY_REQUEST_DELETED_BODY,
            { req_id: item._id, type: Notifications.RECIPROCAL_PLAY, sub_type: Notifications.REQUEST, }
          );
        }).catch(err => {
          console.log('ernnr:', err);
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
      {!isSearch ?
        list && list.length > 0 ?
          <Row>
            <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
              <Label >{PAGE_TEXTS.MY_RECIPROCAL_REQUESTS}</Label>
            </Col>
            {list.map((item, index) => {
              return (
                <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                  <ReciprocalPlayCard
                    item={item}
                    user={user}
                    colors={colors}
                    history={history}
                    navigation={navigation}
                    loading={isLoading}
                    from={'MyRequests'}
                    disabled={isLoading}
                    onClick={() => handleDeleteMyRequest(item)}
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
              <Label >{PAGE_TEXTS.MY_RECIPROCAL_REQUESTS}</Label>
            </Col>
            {searchList.map((item, index) => {
              return (
                <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                  <ReciprocalPlayCard
                    item={item}
                    user={user}
                    colors={colors}
                    history={history}
                    browserHistory={browserHistory}
                    loading={isLoading}
                    from={'MyRequests'}
                    disabled={isLoading}
                    onClick={() => handleDeleteMyRequest(item)}
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

export default MyRequests;
