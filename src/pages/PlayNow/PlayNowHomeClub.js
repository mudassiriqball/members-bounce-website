import { BucketListSearchFilter } from "components/Common";
import PlayNowOfferCard from "components/Common/Cards/PlayNowOfferCard";
import Loading from "components/Common/Loading";
import NoDataFound from "components/Common/NoDataFound";
import PAGE_TEXTS from "constants/PAGE_TEXTS";
import { getBearerToken } from "helpers/authentication";
import { applyPlayNowFilters, getHomeClubPlayNowOffers } from "hooks";
import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Col, Container, Row, Label } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const PlayNowHomeClub = (props) => {
  const { user } = props;
  const token = getBearerToken();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [noDataFound, setNoDataFound] = useState(true);
  const { IS_LOADING, HOME_CLUB_PLAY_NOW_LIST } = getHomeClubPlayNowOffers(token, refresh);
  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterBy, setFilterBy] = useState('');


  useEffect(() => {
    if (HOME_CLUB_PLAY_NOW_LIST) {
      HOME_CLUB_PLAY_NOW_LIST && HOME_CLUB_PLAY_NOW_LIST.forEach((element, index) => {
        if (!element.playWithHomeClub || user.homeClub === element.club || user.homeClub2 === element.club || user.homeClub3 === element.club) {
          setNoDataFound(false);
        }
      });
      setList(HOME_CLUB_PLAY_NOW_LIST);
    }
    return () => {}
  }, [HOME_CLUB_PLAY_NOW_LIST]);

  // Clear Filter
  const clearFilter = () => {
    setFilterType('');
    setList(HOME_CLUB_PLAY_NOW_LIST);
  }

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>Home Club | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Play Now'}
            breadcrumbItem={'Create Bucket-list'}
          />
          {IS_LOADING ? <Loading />
            :
            <>
              {list.length > 0 &&
                <BucketListSearchFilter
                  query={query}
                  handleSearch={(val) => handlePlayNowSearch(list, val, setQuery, setIsSearch, setSearchList)}
                  // Filter
                  applyFilter={() => applyPlayNowFilters(setList, HOME_CLUB_PLAY_NOW_LIST, filterBy, filterType)}
                  clearFilter={clearFilter}
                  filterBy={filterBy}
                  filterType={filterType}
                  setFilterBy={setFilterBy}
                  setFilterType={setFilterType}
                />
              }
              {!isSearch ?
                (noDataFound || HOME_CLUB_PLAY_NOW_LIST.length < 1) ?
                  <NoDataFound />
                  :
                  <Row>
                    <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                      <Label >{PAGE_TEXTS.PLAY_NOW_HOME_CLUB_OFFER}</Label>
                    </Col>
                    {list.map((item, index) => {
                      try {
                        if (!item.playWithHomeClub || user.homeClub === item.club || user.homeClub2 === item.club || user.homeClub3 === item.club) {
                          return (
                            <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                              <PlayNowOfferCard
                                item={item}
                                user={user}
                                from={'HomeClubOffers'}
                              />
                            </Col>
                          )
                        } else {
                          return null;
                        }
                      } catch (error) {
                      }
                    })}
                  </Row>
                :
                searchList && searchList.length > 0 ?
                  <Row>
                    <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                      <Label >{PAGE_TEXTS.PLAY_NOW_HOME_CLUB_OFFER}</Label>
                    </Col>
                    {searchList.map((item, index) => {
                      try {
                        if (!item.playWithHomeClub || user.homeClub === item.club || user.homeClub2 === item.club || user.homeClub3 === item.club) {
                          return (
                            <Col key={index} lg={4} md={6} sm={12} className='d-grid align-items-stretch'>
                              <PlayNowOfferCard
                                item={item}
                                user={user}
                                from={'HomeClubOffers'}
                              />
                            </Col>
                          )
                        } else {
                          return null;
                        }
                      } catch (error) {
                      }
                    })}
                  </Row>
                  :
                  <NoDataFound />
              }
            </>
          }
        </Container>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayNowHomeClub));
