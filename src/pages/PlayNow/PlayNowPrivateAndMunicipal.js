import React, { useState, useEffect } from 'react';
import { PlayNowSearchFilter, Loading, NoDataFound, PlayNowOfferCard } from "components/Common";
import { getBearerToken } from "helpers/authentication";
import golfersType from "helpers/golfersType";
import { applyPlayNowFilters, getPrivateAndMunicipalPlayNowOffers, handlePlayNowSearch } from "hooks";
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Label } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { authenticateUser } from 'store/actions';

const PlayNowPrivateAndMunicipal = (props) => {
  const { user } = props;
  const token = getBearerToken();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [noDataFound, setNoDataFound] = useState(true);
  const { IS_LOADING, PRIVATE_MUNICIPAL_PLAY_NOW_LIST } = getPrivateAndMunicipalPlayNowOffers(token, refresh);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  useEffect(() => {
    if (PRIVATE_MUNICIPAL_PLAY_NOW_LIST) {
      PRIVATE_MUNICIPAL_PLAY_NOW_LIST && PRIVATE_MUNICIPAL_PLAY_NOW_LIST.forEach((element, index) => {
        if (element && element.golferType !== golfersType.ALL_AND_ANY && ((element.golferType !== user.golferType) || (element.golferType === golfersType.COURSE_MANAGER && user.role !== usersRole.COURSE_MANAGER))) {
          return;
        } else {
          setNoDataFound(false);
        }
      });
      setList(PRIVATE_MUNICIPAL_PLAY_NOW_LIST);
    }
    return () => {}
  }, [PRIVATE_MUNICIPAL_PLAY_NOW_LIST]);

  // Clear Filter
  const clearFilter = () => {
    setFilterType('');
    setList(PRIVATE_MUNICIPAL_PLAY_NOW_LIST);
  }

  return (
    <React.Fragment>
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

          {IS_LOADING ? <Loading />
            :
            <>
              {list.length > 0 &&
                <PlayNowSearchFilter
                  from='playNow'
                  query={query}
                  handleSearch={(val) => handlePlayNowSearch(list, val, setQuery, setIsSearch, setSearchList)}
                  // Filter
                  applyFilter={() => applyPlayNowFilters(setList, PRIVATE_MUNICIPAL_PLAY_NOW_LIST, filterBy, filterType)}
                  clearFilter={clearFilter}
                  filterBy={filterBy}
                  filterType={filterType}
                  setFilterBy={setFilterBy}
                  setFilterType={setFilterType}
                />
              }
              {!isSearch ?
                (noDataFound || list.length < 1) ?
                  <NoDataFound />
                  :
                  <Row>
                    <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                      <Label >{PAGE_TEXTS.PLAY_NOW_PRIVATE_MUNICIPAL_OFFER}</Label>
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
                              from={'privateAndMunicipal'}
                              browserHistory={props.history}
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
                      <Label >{PAGE_TEXTS.PLAY_NOW_PRIVATE_MUNICIPAL_OFFER}</Label>
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
                              from={'privateAndMunicipal'}
                              browserHistory={props.history}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayNowPrivateAndMunicipal));
