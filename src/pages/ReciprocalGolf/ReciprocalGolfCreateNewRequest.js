import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import axios from 'axios';
import { Button } from 'components/Common';
import CustomAvField from 'components/Common/CustomAvField';
import CustomSelect from 'components/Common/CustomSelect';
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { urls } from 'helpers';
import { getBearerToken } from 'helpers/authentication';
import { getDateAfter3Months } from 'helpers/dateUtility';
import React, { useEffect, useState } from 'react';
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Label } from "reactstrap";
import { authenticateUser } from 'store/actions';
import Swal from 'sweetalert2';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import moment from 'moment';

const ReciprocalGolfCreateNewRequest = (props) => {
  const { user, isLoggedIn, authenticateUser } = props;
  const token = getBearerToken();
  const [values, setValues] = useState({
    course: user && (user.homeClub ? user.homeClub : user.homeClub2 ? user.homeClub2 : user.homeClub3 ? user.homeClub3 : '' || ''),
    region: user && (user.homeClub ? user.courseLocation : user.homeClub2 ? user.courseLocation2 : user.homeClub3 ? user.courseLocation3 : '' || ''),

    date: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    course: '',
    region: '',
    date: '',
    dateType: '',
  });

  const [HOME_CLUB_LIST, setHOME_CLUB_LIST] = useState([]);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [courseForPicker, setCourseForPicker] = useState('');
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [dateType, setDateType] = useState('');
  const [dateTypeIndex, setDateTypeIndex] = useState(null);

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);


  useEffect(() => {
    user && setHOME_CLUB_LIST([{
      label: user.homeClub, value: user.homeClub
    }]);
    user && setCourseForPicker({ label: user.homeClub, value: user.homeClub });
    if (user && user.homeClub && user.homeClub2 && user.homeClub3) {
      setHOME_CLUB_LIST([
        {
          label: user.homeClub, value: user.homeClub
        },
        {
          label: user.homeClub2, value: user.homeClub2
        },
        {
          label: user.homeClub3, value: user.homeClub3
        }
      ]);
    } else if (user && user.homeClub && user.homeClub2) {
      setHOME_CLUB_LIST([
        {
          label: user.homeClub, value: user.homeClub
        },
        {
          label: user.homeClub2, value: user.homeClub2
        }
      ]);
    } else if (user && user.homeClub) {
      setHOME_CLUB_LIST([
        {
          label: user.homeClub3, value: user.homeClub
        }
      ]);
    }
    return () => {}
  }, [user]);

  const handleDateChange = (date) => {
    setDate(date);
    setErrors({ ...errors, date: '' });
    setValues({ ...values, date: moment(date).format(dateTypeIndex === 0 ? 'DD-MM-YYYY HH:mm:ss' : 'DD-MM-YYYY') });
  };

  const handleHomeClubChange = async (val) => {
    if (val === user.homeClub) {
      setValues({ ...values, course: val, region: user.courseLocation || '' });
    } else if (val === user.homeClub2) {
      setValues({ ...values, course: val, region: user.courseLocation2 || '' });
    } else if (val === user.homeClub3) {
      setValues({ ...values, course: val, region: user.courseLocation3 || '' });
    }
  }

  // Create Offer
  const handleCreateNewOffer = async () => {
    if (values.course === '') {
      Swal.fire(
        'Error',
        'Please first add Home Club in your Profile!',
        'error'
      )
    } else if (values.region === '') {
      Swal.fire(
        'Error',
        'Please first add Course Location in your Profile!',
        'error'
      )
    } else if (dateType === '' || (dateTypeIndex !== 2 && values.date === '')) {
      let dateErr = '';
      let dateTypeErr = '';

      if (dateType === '') {
        dateTypeErr = 'Required*';
      } else if (dateTypeIndex !== 2 && values.date === '') {
        dateErr = 'Required*';
      }
      setErrors({
        ...errors,
        date: dateErr,
        dateType: dateTypeErr
      });
      Swal.fire(
        'Error',
        'Fix errors first!',
        'error'
      )
    } else {
      setIsLoading(true);
      if (dateTypeIndex === 2) {
        values.date = dateType;
      }
      await axios({
        method: 'POST',
        headers: {
          'authorization': token,
        },
        url: urls.CREATE_NEW_RECIPROCAL_PLAY_REQUEST + user._id,
        data: values
      }).then(res => {
        setValues({ ...values, date: '', description: '' });
        setIsLoading(false);
        Swal.fire(
          'Success!',
          'Your request processed successfully',
          'success'
        )
      }).catch(err => {
        setIsLoading(false);
        console.log('handleCreateNewOffer err:', err);
        Swal.fire(
          'Error',
          'Something went wrong, Please try again later!',
          'error'
        )
      })
    }
  }

  return (
    <React.Fragment>
      <div className='page-content'>
        <MetaTags>
          <title>Create New Request | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Reciprocal Golf'}
            breadcrumbItem={'Create New Request'}
          />
          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {}}
              >
                <Row>
                  <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                    <Label >{PAGE_TEXTS.CREATE_NEW_RECIPROCAL_PLAY_REQUEST}</Label>
                  </Col>
                  <hr />
                  <Col lg={6} md={6} sm={12}>
                    <CustomSelect
                      name='course'
                      label={'Course'}
                      value={courseForPicker}
                      onChange={(item) => {
                        handleHomeClubChange(item.value);
                        setCourseForPicker(item);
                      }}
                      options={HOME_CLUB_LIST}
                      classNamePrefix="select2-selection"
                      error={values.homeClub === '' && values.homeClub2 === '' && values.homeClub3 === '' ? 'First add Home Club in your profile!' : errors.course}
                      mandatory
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <CustomAvField
                      name="Region"
                      label="Region"
                      className="form-control"
                      placeholder="Enter Region"
                      type="text"
                      onChange={() => {}}
                      disabled={true}
                      value={values.region}
                      error={values.region === '' ? 'First add Course Location in your profile!' : ''}
                      mandatory
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <CustomSelect
                      name='dateType'
                      label={'Select Date Type'}
                      selected={dateType}
                      onChange={(item) => { setDateType(item.value), setDateTypeIndex(item.value), setErrors({ ...errors, dateType: '', date: '' }) }}
                      options={[
                        { value: 0, label: 'Choose a date and time' },
                        { value: 1, label: 'Choose a date only' },
                        { value: 2, label: 'To be agreed' },
                      ]}
                      classNamePrefix="select2-selection"
                      error={errors.dateType}
                      mandatory
                    />
                  </Col>
                  {(dateTypeIndex === 0) &&
                    <Col lg={6} md={6} sm={12}>
                      <Label>{'Date & Time'}</Label>
                      <span className="text-danger ms-1">&#9733;</span>
                      <input
                        className="form-control"
                        type="datetime-local"
                        defaultValue={date}
                        id="example-datetime-local-input"
                        onChange={handleDateChange}
                        error={errors.date}
                        min={new Date()}
                        max={getDateAfter3Months()}
                      />
                    </Col>
                  }
                  {(dateTypeIndex === 1) &&
                    <Col lg={6} md={6} sm={12}>
                      <CustomAvField
                        name="dateAndTime"
                        label="Date"
                        className="form-control"
                        placeholder="Select Date"
                        type={dateTypeIndex === 0 ? '' : 'date'}
                        onChange={handleDateChange}
                        selected={values.region}
                        error={errors.date}
                        mandatory
                        min={new Date()}
                        max={getDateAfter3Months()}
                      />
                    </Col>
                  }
                </Row>
                <Row>
                  <Col>
                    <CustomAvField
                      name="description"
                      label="Description"
                      className="form-control"
                      placeholder="Enter Description"
                      type="textarea"
                      onChange={(e, text) => setValues({ ...values, description: text })}
                      selected={values.description}
                      error={''}
                    />
                  </Col>
                </Row>
                <hr className='mt-2' />
                <Row className='pt-2'>
                  <Col>
                    <Button
                      disabled={isLoading}
                      loading={isLoading}
                      width='100%'
                      onClick={() => handleCreateNewOffer()}
                    >Create Offer</Button>
                  </Col>
                </Row>
              </AvForm>
            </CardBody>
          </Card>

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
  authenticateUser
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReciprocalGolfCreateNewRequest));
