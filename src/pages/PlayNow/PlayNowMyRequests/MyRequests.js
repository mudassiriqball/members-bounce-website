import React, { useState, useEffect, useRef } from 'react';
import { Loading, NoDataFound, PlayNowOfferCard } from '../../../components/Common';
import { getMyPlayNowRequests, sendNotification } from 'hooks';
import axios from 'axios';
import { urls, Notifications } from 'helpers';
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import routeNames from 'routes/routeNames';
import { Container, Row, Col, Label } from "reactstrap";
import Swal from 'sweetalert2';
import theme from 'constants/theme';

const MyRequests = props => {
  const { user, token, history, browserHistory } = props;
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { IS_LOADING, MY_REQUESTS } = getMyPlayNowRequests(token, refresh, user && user._id, history);

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
  const handleDeleteMyRequest = async (item, index) => {
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
          url: urls.DELETE_MY_PLAY_NOW_REQUEST + item._id,
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
            Notifications.PLAY_NOW_TITLE,
            Notifications.PLAY_NOW_REQUEST_DELETED_BODY,
            { req_id: item._id, type: Notifications.PLAY_NOW, sub_type: Notifications.REQUEST, }
          );
          setRefresh(refresh + 1);
        }).catch(err => {
          console.log('handleDeleteMyRequest err:', err);
          setIsLoading(false);
          Swal.fire(
            'Error',
            'Something went wrong, Please try again later!',
            'error'
          )
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
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
              <Label >{PAGE_TEXTS.PLAY_NOW_PRIVATE_MUNICIPAL_OFFER}</Label>
            </Col>
            {list.map((item, index) => {
              return (
                <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                  <PlayNowOfferCard
                    item={item}
                    user={user}
                    history={history}
                    from={'MyRequests'}
                    onDelete={() => handleDeleteMyRequest(item, index)}
                    loading={isLoading}
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
              <Label >{PAGE_TEXTS.PLAY_NOW_PRIVATE_MUNICIPAL_OFFER}</Label>
            </Col>
            {searchList.map((item, index) => {
              return (
                <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                  <PlayNowOfferCard
                    item={item}
                    user={user}
                    history={history}
                    from={'MyRequests'}
                    onDelete={() => handleDeleteMyRequest(item, index)}
                    loading={isLoading}
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
