import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ConfirmPlayNowRequestModal, Loading, PlayNowOfferCard, UserDetailsCard } from "components/Common";
import { Notifications, urls } from "helpers";
import { getBearerToken } from "helpers/authentication";
import { getMembersOnlyClubs, getUserById, sendNotification } from "hooks";
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import Swal from "sweetalert2";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const ViewAndRequest = (props) => {
  const { MEMBERS_ONLY_CLUBS } = getMembersOnlyClubs();
  const { user } = props;
  const token = getBearerToken();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { IS_LOADING, USER } = getUserById(token, item && item.user_id);
  const [showConfirmRequestModel, setShowConfirmRequestModel] = useState(false);

  useEffect(() => {
    // TODO:
    //   setItem(props.route.params.item);
    setItem(props.location.item);
    // }
    return () => {}
  }, []);

  // Request To Play
  const handleRequestToPlay = async (mobile) => {
    setIsLoading(true);
    await axios({
      method: 'PUT',
      url: urls.REQUEST_PLAY_NOW_OFFER + item._id,
      headers: {
        'authorization': token
      },
      data: {
        user_id: user._id,
        mobile: mobile
      }
    }).then(res => {
      setIsLoading(false);
      if (res.data.code == 202) {
        Swal.fire(
          'Error',
          'Request deleted or group is full !',
          'error'
        )
      } else {
        Swal.fire(
          'Deleted!',
          'Your request processed successfully',
          'success'
        )
        if (res.data.status !== 201) {
          sendNotification(
            token, item.user_id,
            user._id, Notifications.PLAY_NOW_TITLE,
            Notifications.PLAY_NOW_NEW_REQUEST_BODY,
            { req_id: item._id, type: Notifications.PLAY_NOW, sub_type: Notifications.REQUEST }
          );
        }
      }
    }).catch(err => {
      console.log('ernnr:', err);
      setIsLoading(false);
      Swal.fire(
        'Error',
        'Something went wrong, Please try again later!',
        'error'
      )
    });
  }

  // Delete My Request
  const handleDeleteRequest = async (item) => {
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
            token, item.user_id,
            user._id, Notifications.PLAY_NOW_TITLE,
            Notifications.PLAY_NOW_REQUEST_DELETED_BODY,
            { req_id: item._id, type: Notifications.PLAY_NOW, sub_type: Notifications.REQUEST, }
          );
          setRefresh(refresh + 1);
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

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>View & Request | Members Bounce</title>
        </MetaTags>
        <ConfirmPlayNowRequestModal
          visible={showConfirmRequestModel}
          onHide={() => setShowConfirmRequestModel(false)}
          user={user}
          onConfirm={handleRequestToPlay}
        />
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Play Now'}
            breadcrumbItem={'View & Request'}
          />
          {IS_LOADING ? <Loading />
            : <>
              <UserDetailsCard
                user={user}
                element={USER}
              />

              <PlayNowOfferCard
                item={item}
                user={user}
                browserHistory={props.history}
                from={'viewAndRequest'}
                loading={isLoading}
                disabled={isLoading || item && (user._id === item.user_id)}
                onClick={() => {
                  const found = MEMBERS_ONLY_CLUBS && MEMBERS_ONLY_CLUBS.filter((element) => {
                    if (item.club === element.course) {
                      return true;
                    }
                  });
                  if (found && found.length > 0 && user.level < 2) {
                    Swal.fire(
                      'Access Denied',
                      'Sorry you can not request for members only club, Only users with level 2 can access them, upgrade your account to access.',
                      'warning'
                    )
                  } else {
                    setShowConfirmRequestModel(true);
                  }
                }
                }
                onDelete={() => handleDeleteRequest(item)}
              />
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAndRequest));
