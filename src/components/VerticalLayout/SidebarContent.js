import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import routeNames from "../../routes/routeNames"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">

            {/* Members */}
            <li className="menu-title">{"Members"} </li>

            {/* Top 100 Bucket List */}
            <li>
              <Link to="/#" className="">
                <i className="bx bx-basket"></i>
                <span>{"Top 100 Bucket-list"}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to={routeNames.Private.CreateTop100BucketList}>{'Create Bucket-list'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.MyTop100BucketList}>{'My Bucket-list'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.Top100BucketListPlayed}>{'Top 100 Played'}</Link>
                </li>
              </ul>
            </li>

            {/* Custom Bucket List */}
            <li>
              <Link to="/#" className="">
                <i className="bx bx-basket"></i>
                <span>{"Custom Bucket-list"}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to={routeNames.Private.CreateCustomBucketList}>{'Create Custom Bucket-list'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.MyCustomBucketList}>{'My Custom Bucket-list'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.CustomBucketListPlayed}>{'Custom Bucket-list Played'}</Link>
                </li>
              </ul>
            </li>


            {/* Play Now */}
            <li>
              <Link to="/#" className="">
                <i className="mdi mdi-golf"></i>
                <span>{"Play Now"}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to={routeNames.Private.PlayNow_CreateNewRequest}>{'Create New Offer'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.PlayNow_PrivateAndMunicipal}>{'Private & Municipal'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.PlayNow_Top100}>{'Top 100'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.PlayNow_HomeClub}>{'Home Club'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.PlayNow_MyRequests}>{'My Requests'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.PlayNow_MyListings}>{'My Listings'}</Link>
                </li>
              </ul>
            </li>

            {/* Reciprocal Golf */}
            <li>
              <Link to="/#" className="">
                <i className="mdi mdi-golf-tee"></i>
                <span>{"Reciprocal Golf"}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to={routeNames.Private.ReciprocalGolf_CreateNewRequest}>{'Create New Request'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.ReciprocalGolf_AllRequests}>{'All Requests'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.ReciprocalGolf_MyRequests}>{'My Requests'}</Link>
                </li>
                <li>
                  <Link to={routeNames.Private.ReciprocalGolf_MyListings}>{'My Listings'}</Link>
                </li>
              </ul>
            </li>
            {/* End Of Members */}

            {/* Chat */}
            <li>
              <Link to={routeNames.Private.Chat} className="">
                <i className="bx bx-chat"></i>
                <span>{"Chat"}</span>
              </Link>
            </li>

            {/* Notifications */}
            <li>
              <Link to={routeNames.Private.Notifications} className="">
                <i className="bx bx-bell"></i>
                <span>{"Notifications"}</span>
              </Link>
            </li>

            {/* Refer Friend */}
            <li>
              <Link to={routeNames.Private.ReferFriend} className="">
                <i className="mdi mdi-golf-tee"></i>
                <span>{"Refer Friend"}</span>
              </Link>
            </li>

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

export default withRouter(withTranslation()(SidebarContent))
