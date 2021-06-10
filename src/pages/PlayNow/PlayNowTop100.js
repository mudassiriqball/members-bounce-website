import React, { Component, useEffect, useState } from 'react';
import { PlayNowSearchFilter, Loading, NoDataFound, PlayNowOfferCard } from 'components/Common';
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { getBearerToken } from 'helpers/authentication';
import golfersType from 'helpers/golfersType';
import { applyPlayNowFilters, getTopHundredPlayNowOffers, handlePlayNowSearch } from 'hooks';
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Container, Row, Label } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const PlayNowTop100 = (props) => {
  const { user } = props;
  const token = getBearerToken();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [noDataFound, setNoDataFound] = useState(true);
  const { IS_LOADING, TOP_HUNDRED_OFFERS } = getTopHundredPlayNowOffers(token, refresh, user && user._id);
  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    const clearTimeout = setTimeout(() => {
    }, 500);
    return () => { clearTimeout }
  }, []);

  useEffect(() => {
    if (TOP_HUNDRED_OFFERS)
      TOP_HUNDRED_OFFERS && TOP_HUNDRED_OFFERS.forEach((element, index) => {
        if (user && element && element.golferType !== golfersType.ALL_AND_ANY && ((element.golferType !== user.golferType) || (element.golferType === golfersType.COURSE_MANAGER && user.role !== usersRole.COURSE_MANAGER))) {
        } else {
          setNoDataFound(false);
        }
      });
    setList(TOP_HUNDRED_OFFERS);
    return () => {}
  }, [TOP_HUNDRED_OFFERS]);

  // Clear Filter
  const clearFilter = () => {
    setFilterType('');
    setList(TOP_HUNDRED_OFFERS);
  }

  return (
    <React.Fragment>
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

          {list.length > 0 &&
            <PlayNowSearchFilter
              from='playNow'
              query={query}
              handleSearch={(val) => handlePlayNowSearch(list, val, setQuery, setIsSearch, setSearchList)}
              // Filter
              applyFilter={() => applyPlayNowFilters(setList, TOP_HUNDRED_OFFERS, filterBy, filterType)}
              clearFilter={clearFilter}
              filterBy={filterBy}
              filterType={filterType}
              setFilterBy={setFilterBy}
              setFilterType={setFilterType}
            />
          }
          {IS_LOADING ? <Loading />
            :
            <>
              {!isSearch ?
                (noDataFound || list.length < 1) ?
                  <NoDataFound />
                  :
                  <Row>
                    <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                      <Label >{PAGE_TEXTS.PLAY_NOW_TOP_HUNDRED_OFFER}</Label>
                    </Col>
                    {list.map((item, index) => {
                      try {
                        if (item && item.golferType !== golfersType.ALL_AND_ANY && ((item.golferType !== user.golferType) || (item.golferType === golfersType.COURSE_MANAGER && user.role !== usersRole.COURSE_MANAGER))) {
                          return;
                        }
                        return (
                          <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                            <PlayNowOfferCard
                              item={item}
                              user={user}
                              browserHistory={props.history}
                              from={'topHundred'}
                            />
                          </Col>
                        )
                      } catch (error) {}
                    })}
                  </Row>
                :
                searchList && searchList.length > 0 ?
                  <Row>
                    <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                      <Label >{PAGE_TEXTS.PLAY_NOW_TOP_HUNDRED_OFFER}</Label>
                    </Col>
                    {searchList.map((item, index) => {
                      try {
                        if (item && item.golferType !== golfersType.ALL_AND_ANY && ((item.golferType !== user.golferType) || (item.golferType === golfersType.COURSE_MANAGER && user.role !== usersRole.COURSE_MANAGER))) {
                          return;
                        }
                        return (
                          <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                            <PlayNowOfferCard
                              item={item}
                              user={user}
                              browserHistory={props.history}
                              from={'topHundred'}
                            />
                          </Col>
                        )
                      } catch (error) {}
                    })}
                  </Row>
                  :
                  <NoDataFound />
              }
            </>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayNowTop100));
