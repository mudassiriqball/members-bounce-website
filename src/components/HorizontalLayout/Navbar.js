import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"
import routeNames from "routes/routeNames"

const Navbar = props => {
  const [customBucketList, setShowCustomBucketList] = useState(false)
  const [showTop100BucketList, setsHowTop100BucketList] = useState(false)
  const [showPlayNow, setShowPlayNow] = useState(false)
  const [showReciprocal, setShowReciprocal] = useState(false)
  const [showRefer, setShowRefer] = useState(false)


  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                {/* Top 100 Bucket List */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setsHowTop100BucketList(!showTop100BucketList)
                    }}
                    to={'/#'}
                  >
                    <i className="bx bx-home-circle me-2"></i>
                    {'Top 100 Bucket-list'} {props.menuOpen}
                    <div className="arrow-down"></div>
                  </Link>
                  <div
                    className={classname("dropdown-menu", { show: showTop100BucketList })}
                  >
                    <Link to={routeNames.Private.CreateTop100BucketList} className="dropdown-item">
                      {'Create Bucket-list'}
                    </Link>
                    <Link to={routeNames.Private.MyTop100BucketList} className="dropdown-item">
                      {'My Bucket-list'}
                    </Link>
                    <Link to={routeNames.Private.Top100BucketListPlayed} className="dropdown-item">
                      {'Top 100 Played'}
                    </Link>
                  </div>
                </li>

                {/* Custom Bucket List */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setShowCustomBucketList(!customBucketList)
                    }}
                    to={'/#'}
                  >
                    <i className="bx bx-home-circle me-2"></i>
                    {'Custom Bucket-list'} {props.menuOpen}
                    <div className="arrow-down"></div>
                  </Link>
                  <div
                    className={classname("dropdown-menu", { show: customBucketList })}
                  >
                    <Link to={routeNames.Private.CreateCustomBucketList} className="dropdown-item">
                      {'Create Custom Bucket-list'}
                    </Link>
                    <Link to={routeNames.Private.MyCustomBucketList} className="dropdown-item">
                      {'My Custom Bucket-list'}
                    </Link>
                    <Link to={routeNames.Private.CustomBucketListPlayed} className="dropdown-item">
                      {'Custom Bucket-list Played'}
                    </Link>
                  </div>
                </li>

                {/* Play Now */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setShowPlayNow(!showPlayNow)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="bx bx-customize me-2"></i>
                    {'Play Now'} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: showPlayNow })}>
                    <Link to={routeNames.Private.PlayNow_CreateNewRequest} className="dropdown-item">
                      {'Create New Offer'}
                    </Link>
                    <Link to={routeNames.Private.PlayNow_PrivateAndMunicipal} className="dropdown-item">
                      {'Private & Municipal'}
                    </Link>
                    <Link to={routeNames.Private.PlayNow_Top100} className="dropdown-item">
                      {'Top 100'}
                    </Link>
                    <Link to={routeNames.Private.PlayNow_HomeClub} className="dropdown-item">
                      {'Home Club'}
                    </Link>
                    <Link to={routeNames.Private.PlayNow_MyRequests} className="dropdown-item">
                      {'My Requests'}
                    </Link>
                    <Link to={routeNames.Private.PlayNow_MyListings} className="dropdown-item">
                      {'My Listings'}
                    </Link>
                  </div>
                </li>

                {/* Reciprocal Golf */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setShowReciprocal(!showReciprocal)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="bx bx-customize me-2"></i>
                    {'Reciprocal Golf'} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: showReciprocal })}>
                    <Link to={routeNames.Private.ReciprocalGolf_CreateNewRequest} className="dropdown-item">
                      {'Create New Request'}
                    </Link>
                    <Link to={routeNames.Private.ReciprocalGolf_AllRequests} className="dropdown-item">
                      {'All Requests'}
                    </Link>
                    <Link to={routeNames.Private.ReciprocalGolf_MyRequests} className="dropdown-item">
                      {'My Requests'}
                    </Link>
                    <Link to={routeNames.Private.ReciprocalGolf_MyListings} className="dropdown-item">
                      {'My Listings'}
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setShowRefer(!showRefer)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="bx bx-customize me-2"></i>
                    {'Refer Friend'} <div className="arrow-down"></div>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
