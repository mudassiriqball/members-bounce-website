import { Button, ErrorAlert, SuccessAlert } from "components/Common";
import { getBearerToken } from "helpers/authentication";
import PAGE_TEXTS from 'constants/PAGE_TEXTS';
import { getTopHundredBucketList } from "hooks";
import { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Container, Row, Col, Label } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import CustomSelect from "components/Common/CustomSelect";
import CustomAvField from "components/Common/CustomAvField";
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import golfersType from "helpers/golfersType";
import { getDateAfter3Months } from "helpers/dateUtility";
import moment from 'moment';
import { REGEX, urls } from "helpers";
import axios from "axios";

const PlayNowCreateNewOffer = (props) => {
  const { user } = props;
  const token = getBearerToken();
  const [dateType, setDateType] = useState('');
  const [dateTypeIndex, setDateTypeIndex] = useState(null);
  const [values, setValues] = useState({
    club: user && (user.homeClub ? user.homeClub : user.homeClub2 ? user.homeClub2 : user.homeClub3 ? user.homeClub3 : '' || ''),
    region: user && (user.homeClub ? user.courseLocation : user.homeClub2 ? user.courseLocation2 : user.homeClub3 ? user.courseLocation3 : '' || ''),
    date: '',
    golferType: '',
    playWithHomeClub: false,
    size: '',
    greenFee: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    club: '',
    region: '',
    date: '',
    dateType: '',
    golferType: '',
    size: '',
    greenFee: '',
    greenFee: '',
  });

  const [HOME_CLUB_LIST, setHOME_CLUB_LIST] = useState([]);
  const [courseForPicker, setCourseForPicker] = useState('');
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [alertErrorMsg, setAlertErrorMsg] = useState('');

  const { BUCKET_LIST } = getTopHundredBucketList(token, 0);
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

  useEffect(() => {
    try {
      const list = BUCKET_LIST && BUCKET_LIST.filter(item => {
        try {
          return item.course.trim() === user.homeClub.trim()
        } catch (error) {
          return false;
        }
      })
      setValues({ ...values, type: list.length > 0 ? 'topHundred' : 'privateAndMunicipal' });
    } catch (error) {
      setValues({ ...values, type: 'privateAndMunicipal' });
    }
    return () => {}
  }, [user, BUCKET_LIST]);

  const handleDateChange = (event, date) => {
    setDate(date);
    setErrors({ ...errors, date: '' });
    setValues({ ...values, date: moment(date).format(dateTypeIndex === 0 ? 'DD-MM-YYYY HH:mm:ss' : 'DD-MM-YYYY') });
  };

  const handleHomeClubChange = async (val) => {
    try {
      const list = BUCKET_LIST && BUCKET_LIST.filter(item => {
        try {
          return item.course.trim() === val.trim();
        } catch (error) {
          return false;
        }
      });
      if (val === user.homeClub) {
        setValues({ ...values, club: val, type: list.length > 0 ? 'topHundred' : 'privateAndMunicipal', region: user && user.courseLocation || '' });
      } else if (val === user.homeClub2) {
        setValues({ ...values, club: val, type: list.length > 0 ? 'topHundred' : 'privateAndMunicipal', region: user && user.courseLocation2 || '' });
      } else if (val === user.homeClub3) {
        setValues({ ...values, club: val, type: list.length > 0 ? 'topHundred' : 'privateAndMunicipal', region: user && user.courseLocation3 || '' });
      }
    } catch (error) {
      console.log('handleHomeClubChange error:', error);
      if (val === user.homeClub) {
        setValues({ ...values, club: val, type: 'privateAndMunicipal', region: user && user.courseLocation || '' });
      } else if (val === user.homeClub2) {
        setValues({ ...values, club: val, type: 'privateAndMunicipal', region: user && user.courseLocation2 || '' });
      } else if (val === user.homeClub3) {
        setValues({ ...values, club: val, type: 'privateAndMunicipal', region: user && user.courseLocation3 || '' });
      }
    }
  }

  // Create Offer
  const handleCreateNewOffer = async () => {
    if (values.club === '') {
      setErrorAlert(true);
      setAlertErrorMsg('Please first add Home Club in your Profile!')
    } else if (values.region === '') {
      setErrorAlert(true);
      setAlertErrorMsg('Please first add Course Location in your Profile!')
    } else if (
      dateType === '' || (dateTypeIndex !== 2 && values.date === '') ||
      values.size === '' || values.greenFee === '' ||
      !REGEX.POSITIVE.test(values.greenFee) || values.golferType === ''
    ) {
      let dateErr = '';
      let sizeErr = '';
      let greenFErr = '';
      let golferTypeErr = '';
      let dateTypeErr = '';

      if (dateType === '') {
        dateTypeErr = 'Required*';
      } else if (dateTypeIndex !== 2 && values.date === '') {
        dateErr = 'Required*';
      }
      if (values.size === '') {
        sizeErr = 'Required*';
      }

      if (values.greenFee === '') {
        greenFErr = 'Required*';
      } else if (!REGEX.POSITIVE.test(values.greenFee)) {
        greenFErr = 'Must be positive number';
      }

      if (values.golferType === '') {
        golferTypeErr = 'Required*';
      }

      setErrors({
        ...errors,
        date: dateErr,
        size: sizeErr,
        greenFee: greenFErr,
        golferType: golferTypeErr,
        dateType: dateTypeErr
      });
      setErrorAlert(true);
      setAlertErrorMsg('Fix errors first!')
    } else {
      console.log(values)
      setIsLoading(true);
      if (dateTypeIndex === 2) {
        values.date = dateType;
      }
      await axios({
        method: 'POST',
        headers: {
          'authorization': token,
        },
        url: urls.CREATE_NEW_PLAY_NOW_OFFER + user._id,
        data: values
      }).then(res => {
        setValues({ ...values, date: '', playWithHomeClub: false, size: '', golferType: '', greenFee: '' });
        setDateTypeIndex('');
        setIsLoading(false);
        setSuccessAlert(true);
      }).catch(err => {
        setIsLoading(false);
        console.log('handleCreateNewOffer err:', err);
        setErrorAlert(true);
      })
    }
  }

  const handleGolferType = (item) => {
    let id = item.value;
    setErrors({ ...errors, golferType: '' });
    if (id === 0) {
      setValues({ ...values, playWithHomeClub: true, golferType: golfersType.HOME_CLUB_ONLY })
    } else if (id === 1) {
      setValues({ ...values, playWithHomeClub: false, golferType: golfersType.ALL_AND_ANY })
    } else if (id === 2) {
      setValues({ ...values, playWithHomeClub: false, golferType: golfersType.PRIVATE_CLUB })
    } else if (id === 3) {
      setValues({ ...values, playWithHomeClub: false, golferType: golfersType.MEMBERS_ONLY })
    } else if (id === 4) {
      setValues({ ...values, playWithHomeClub: false, golferType: golfersType.INDIVIDUAL })
    } else if (id === 5) {
      setValues({ ...values, playWithHomeClub: false, golferType: golfersType.COURSE_MANAGER })
    } else if (id === 6) {
      setValues({ ...values, playWithHomeClub: false, golferType: golfersType.CORPORATE })
    }
  }

  return (
    <>
      <div className='page-content'>
        <MetaTags>
          <title>Create New Offer | Members Bounce</title>
        </MetaTags>
        {errorAlert &&
          <ErrorAlert msg={alertErrorMsg} onClick={() => { setErrorAlert(false), setAlertErrorMsg('') }} />
        }
        {successAlert &&
          <SuccessAlert onClick={() => setSuccessAlert(false)} />
        }
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Play Now'}
            breadcrumbItem={'Create New Play Now Offer'}
          />
          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {}}
              >
                <Row>
                  <Col lg={12} md={12} sm={12} style={{ marginBottom: '30px' }}>
                    <Label >{PAGE_TEXTS.CREATE_PLAY_NOW_OFFER}</Label>
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
                      error={values.homeClub === '' && values.homeClub2 === '' && values.homeClub3 === '' ? 'First add Home Club in your profile!' : errors.club}
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
                    <CustomAvField
                      name="greenFee"
                      label="Green Fee"
                      className="form-control"
                      placeholder={'Enter Green Fee (Check Website)'}
                      type="number"
                      onChange={(e, val) => {
                        setValues({ ...values, greenFee: val });
                        setErrors({ ...errors, greenFee: '' });
                      }}
                      value={values.greenFee}
                      error={errors.greenFee}
                      mandatory
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <CustomSelect
                      name='groupSize'
                      label={'Group Size (including you)'}
                      selected={values.size}
                      onChange={(item) => {
                        setValues({ ...values, size: item.value });
                        setErrors({ ...errors, size: '' });
                      }}
                      options={[
                        { label: 2, value: 2 },
                        { label: 3, value: 3 },
                        { label: 4, value: 4 },
                      ]}
                      classNamePrefix="select2-selection"
                      error={errors.size}
                      mandatory
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <CustomSelect
                      name='golferType'
                      label={'Golfers Type'}
                      selected={values.golferType}
                      onChange={handleGolferType}
                      options={
                        user && user.level > 0 ?
                          [
                            { value: 0, label: 'Play only with home club members' },
                            { value: 1, label: 'Any and All' },
                            { value: 2, label: 'Private Club' },
                            { value: 3, label: 'Members Only Club' },
                            { value: 4, label: 'Independent / Casual Golfer' },
                            { value: 5, label: 'Course Manager' },
                            { value: 6, label: 'Corporate' },
                          ]
                          :
                          [
                            { value: 1, label: 'Any and All' },
                            { value: 2, label: 'Private Club' },
                            { value: 3, label: 'Members Only Club' },
                            { value: 4, label: 'Independent / Casual Golfer' },
                            { value: 5, label: 'Course Manager' },
                            { value: 6, label: 'Corporate' },
                          ]
                      }
                      classNamePrefix="select2-selection"
                      error={errors.golferType}
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
                    <Col lg={12} md={12} sm={12}>
                      <Label>{'Date and Time'}</Label>
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
                    <Col lg={12} md={12} sm={12}>
                      <CustomAvField
                        name="dateAndTime"
                        label="Date & Time"
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
                      error={values.description}
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
    </>
  )
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayNowCreateNewOffer));
